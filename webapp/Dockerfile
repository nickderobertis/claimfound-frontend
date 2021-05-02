FROM cfstatic_ubuntu
LABEL maintainer="Nick DeRobertis <nick@claimfound.com>" 

ARG CF_PRODUCTION_LOGGING
ARG CF_DEV_LOGGING
ARG CF_ANGULAR_PRODUCTION
ARG CF_PRODUCTION_SERVERS
ARG CF_AOT_COMPILATION
ARG GOOGLE_MAPS_API_KEY
ARG CF_ENVIRONMENT_TYPE
ARG CF_SSL_ENABLED
ARG FE_SERVICE_PORT
ARG FE_DOMAIN
ARG BE_DOMAIN
ARG MAPS_DOMAIN
ARG CF_ANALYTICS_HOTJAR
ARG BE_SERVICE_PORT
ARG CF_ANALYTICS_FE
ARG CF_ANALYTICS_FE_DEBUG
ARG GOOGLE_ANALYTICS_TRACKING_ID
ARG GIT_CURRENT_REVISION
ARG INTERCOM_APP_ID
ARG CF_INCLUDE_SVELTE_APP
ARG FE_SVELTE_PORT

WORKDIR /scripts
COPY scripts/outdated-packages-check.sh /scripts/

WORKDIR /front

COPY build-scripts /front/build-scripts

#Install xz-utils, nginx
RUN /root/build-scripts/install-nginx

#Install node, npm
RUN /root/build-scripts/install-nodejs-npm

# Install python using pyenv
ENV PYTHON_VERSION 3.8.5
RUN /root/build-scripts/install-python.sh
ENV HOME /root
ENV PYENV_ROOT $HOME/.pyenv
ENV PATH $PYENV_ROOT/shims:$PYENV_ROOT/bin:$PATH
RUN pyenv global $PYTHON_VERSION
RUN pyenv rehash

#Install rollbar
RUN /root/build-scripts/install-pip-and-rollbar.sh;

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chmod 777 -R *

RUN ./utils/build-frontend

HEALTHCHECK --start-period=600s --interval=60s --timeout=30s --retries=5 \
  CMD bash /front/health_check_script.sh

CMD ["bash", "/front/start.sh"]
