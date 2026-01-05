FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# 確保 .env 檔案在此時被複製進去 (需搭配已修正的 .dockerignore)
COPY . .

# 1. 宣告 ARG 接球 (來自 docker-compose 的 args)
ARG NEXT_PUBLIC_API_HOST
ARG NEXT_APP_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# Set environment variables from build arguments
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST
ENV NEXT_APP_URL=$NEXT_APP_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# 直接打包，Next.js 會自動抓取根目錄下的 .env 檔案
RUN npm run build

# Next.js 預設是 3000，建議維持一致
EXPOSE 3000

CMD ["npm", "start"]
