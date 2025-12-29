FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
# 如果是純靜態輸出 (output: export)，這裡可能要改用 nginx image
# 但如果你是用標準 Next.js server 模式，用下面這樣即可：

RUN npm install

COPY . .

# Declare build arguments
ARG NEXT_PUBLIC_API_HOST
ARG NEXT_APP_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# Set environment variables from build arguments
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST
ENV NEXT_APP_URL=$NEXT_APP_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# 打包
RUN npm run build

# 開放 Port (容器內部通常用 3000)
EXPOSE 3001

# 啟動
CMD ["npm", "start"]