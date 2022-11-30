FROM mcr.microsoft.com/playwright:latest
LABEL maintainer="team@artillery.io"

RUN npm install -g jest artillery @playwright/test artillery-engine-playwright && \
        npm cache clean --force && \
        rm -rf /root/.cache && \
        rm -rf /ms-playwright/firefox* && \
        rm -rf /ms-playwright/webkit*

COPY /artillery /artillery/
RUN ln -s /usr/lib/node_modules /artillery/node_modules

ENTRYPOINT ["/usr/bin/artillery"]
