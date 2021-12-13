FROM node:16

#Create application directory
WORKDIR /usr/src/app

# Copy application source code files
COPY . .
RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]