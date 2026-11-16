# u-dynacloud

使用 Next.js 15 App Router 建構的企業形象網站。

## 技術棧

- **框架**: Next.js 15 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **UI 元件**: shadcn/ui + Radix UI
- **狀態管理**: TanStack Query + nuqs (URL 狀態)
- **表單處理**: React Hook Form + Zod
- **國際化**: next-intl
- **動畫**: Framer Motion

## 開始使用

### 環境需求

- Node.js 22.19.0
- pnpm 10.26.0

### 安裝

```bash
# 安裝依賴
pnpm install

# 設定環境變數
cp .env.example .env
```

### 環境變數

```env
NEXT_PUBLIC_API_HOST=   # 後端 API 位址
```

### 開發指令

```bash
pnpm dev      # 啟動開發伺服器
pnpm build    # 建置生產版本
pnpm start    # 啟動生產伺服器
pnpm lint     # 執行 ESLint 檢查
```

## Docker image（build 與部署）

### build 時寫死的設定

前台有 3 個值要在 build 時用 `--build-arg` 傳入，會**寫死在 image 裡**（`NEXT_PUBLIC_*` 會直接寫進瀏覽器端的 JS）：

| build arg | production | staging |
|---|---|---|
| `NEXT_PUBLIC_API_HOST` | `https://datafeed.dynacloud.ai` | `http://localhost:4120` |
| `NEXT_APP_URL` | `https://dynacloud.ai` | `http://localhost:3011` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | 見 `deploy/production/build-images.sh` | 見 `deploy/staging/.env` |

- 因為網址寫死了，**staging 和 production 要分開 build**：production 用 `front`，staging 用 `front-staging`。
- 這 3 個值都是公開資訊，瀏覽器本來就看得到。**不要把任何 secret 當成 build arg，或取名成 `NEXT_PUBLIC_*`**：它會留在 image 裡，`NEXT_PUBLIC_*` 還會直接送到每個訪客的瀏覽器。
- 執行時 compose 也會設定同樣 3 個值。要改網址或 reCAPTCHA key 時，build 腳本和 compose 都要改，然後重新 build。

### 一般做法：用 monorepo 的腳本

腳本放在 monorepo 根目錄的 `deploy/`，**不在這個 repo 裡**。腳本裡已經寫好各環境的 build arg，並且用 `git archive` 匯出 HEAD 再 build，所以沒 commit 的修改和本機的 `.env` 都不會被打包進去。

事前準備：Docker Desktop、Git Bash（Windows）、gcloud（先執行 `gcloud auth login`、`gcloud auth configure-docker asia-east1-docker.pkg.dev`）。

```bash
# 在 monorepo 根目錄執行
# production：build 並 push 到 Artifact Registry（HEAD 必須已經 push 到 origin/master），結束時會印出上線指令
bash deploy/production/build-images.sh front
bash deploy/production/release.sh front=<tag>

# staging：只 build，不 push；需要本機的 deploy/staging/.env（reCAPTCHA key 從這裡讀，以 staging VM 的 /var/www/.env 為準）
bash deploy/staging/build-images.sh front
docker push asia-east1-docker.pkg.dev/dynacloud/web/front-staging:<tag>
```

- tag 是 commit hash 的前 12 碼。同一個 commit 重新 build 會覆蓋 registry 上同名的 tag。
- image 約 2GB。
- 完整步驟（上線、驗證、還原）見 monorepo 的 `deploy/production/DEPLOY.md`、`deploy/staging/README.md`。

### 手動 build（沒有 monorepo 的腳本時）

```bash
# 在這個 repo 的根目錄執行（以 production 為例）
TAG=$(git rev-parse --short=12 HEAD)
docker build --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_API_HOST=https://datafeed.dynacloud.ai \
  --build-arg NEXT_APP_URL=https://dynacloud.ai \
  --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<site key> \
  -t asia-east1-docker.pkg.dev/dynacloud/web/front:$TAG .
docker push asia-east1-docker.pkg.dev/dynacloud/web/front:$TAG
```

- VM 是 amd64，所以一定要加 `--platform linux/amd64`。
- **`.dockerignore` 沒有排除 `.env`**：在工作目錄直接 build 時，本機的 `.env` 會被打包進去，Next.js build 時也會讀到它。正式部署請用上面的腳本，或從乾淨的 checkout build。
- Dockerfile 用的是 `npm install` 加上 **`package-lock.json`**，不是 pnpm。`package-lock.json` 鎖定的是 2026-11-13 production 實際在跑的版本（從線上容器的安裝紀錄產生）。
  - 用 pnpm 改了套件之後，要再執行 `npm install --package-lock-only` 同步更新 `package-lock.json`，兩份 lock 都要 commit，否則 image 裡的套件版本會和 `package.json` 對不上。
  - 兩份 lock 目前的版本不完全相同（例如 react：pnpm 是 19.2.3，`package-lock.json` 和 production 是 19.3.1）。本機 `pnpm dev` 跑的版本和 image 不一定一樣，遇到「本機正常、線上有問題」時要記得這一點。

### build 完之後確認

```bash
IMG=asia-east1-docker.pkg.dev/dynacloud/web/front:<tag>
# 確認寫進去的是對的環境（production 應該是 datafeed.dynacloud.ai，staging 是 localhost:4120）
docker image inspect $IMG --format '{{range .Config.Env}}{{println .}}{{end}}' | grep NEXT_
```

## 專案結構

```
src/
├── app/[locale]/     # Next.js App Router 頁面 (依語系路由)
├── api/              # API 端點函式
├── queries/          # TanStack Query 設定與 nuqs URL 狀態
├── components/
│   ├── ui/           # shadcn/ui 元件
│   ├── home/         # 首頁區塊元件
│   ├── layout/       # Header、Footer
│   └── [feature]/    # 功能模組元件
├── lib/
│   ├── fetcher/      # 自訂 fetch 封裝
│   └── utils.ts      # 工具函式
├── hooks/            # 自訂 React Hooks
├── i18n/             # next-intl 設定
├── messages/         # 多語系翻譯檔 (tw.json、en.json)
├── types/
│   ├── api-request/  # 請求參數型別
│   └── api-response/ # 回應資料型別
└── data/             # 靜態資料 (備用)
```

## 國際化

專案支援以下語系：

- `tw` - 正體中文 (預設)
- `en` - 英文

翻譯檔案位於 `src/messages/` 目錄。

## 資料獲取模式

專案採用三層資料獲取架構：

1. **API 層** (`src/api/`): 封裝 `apiFetcher` 的端點函式
2. **Query 層** (`src/queries/`): TanStack Query 設定，包含 Zod 驗證與 nuqs URL 狀態
3. **元件層**: 使用 `useQuery`/`useSuspenseQuery` 取得資料

```typescript
// 1. API 函式
export const GetServices = (params) =>
  apiFetcher<GetServicesResponse>("/services", { body: params });

// 2. Query 設定
export const getServicesQuery = (locale, params) => ({
  queryKey: [locale, "services", params],
  queryFn: () => GetServices(params),
});

// 3. 元件使用
const { data } = useQuery(getServicesQuery(locale, params));
```

## 授權

私有專案
