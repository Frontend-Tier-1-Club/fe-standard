FROM nginx:1.27.3 as production                        
WORKDIR /app
COPY ./out /usr/share/nginx/html
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
