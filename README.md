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
