# Metrics

Metrics for this app are exported in Prometheus format using the [alphagov Prometheus exporter](https://github.com/alphagov/paas-prometheus-exporter).
The metrics are ingested and stored in a private [Prometheus](https://prometheus.io/) server and then displayed and alerted on using a private [Grafana](https://grafana.com/docs/grafana/latest/introduction/oss-details/) instance.

## Installation

Create a separate metrics space in GovPaaS to keep the metrics separate.

- Login to Cloud Foundry
- Run `cf create-space i-dot-ai-metrics`

### Prometheus Exporter

- [Get someone with permissions to] create a GovPaaS user specifically for running the prometheus exporter app. This user needs space auditor permissions for the space being monitored.
- Check out the paas-prometheus-exporter repo - https://github.com/alphagov/paas-prometheus-exporter
- CD into that directory
- Set your Cloud Foundry target space to the right one for the exporter
- Run `cf push --no-start prometheus-exporter --no-route`
- Run `cf map-route prometheus-exporter apps.internal --hostname prometheus-exporter-i-dot-ai`
- Run `cf set-env prometheus-exporter API_ENDPOINT https://api.cloud.service.gov.uk`
- Run `cf set-env prometheus-exporter USERNAME <your prometheus GovPaaS user username here>`
- Run `cf set-env prometheus-exporter PASSWORD <your prometheus GovPaaS user password here>`
- Run `cf start prometheus-exporter`

### Database for the Prometheus server

- Run `cf create-service influxdb tiny-1.x prometheus-influxdb`

### Prometheus Server
- Cd to the PrometheusServer directory
- Run `cf create-app prometheus-server` <- This name should match the name in `manifest.yml`
- Run `cf apply-manifest -f manifest.yml`
- Run `cf bind-service prometheus-server prometheus-influxdb`
- Run `cf add-network-policy prometheus-server prometheus-exporter --protocol tcp --port 8080`
- Run `cf push prometheus-server`

### Setup frontend WebUI routing and proxy for server
- Run `cf map-route prometheus-server london.cloudapps.digital --hostname prometheus-server-i-dot-ai`
- cd to the proxy/ folder
- Run 
```bash
ALLOWED_IPS="51.149.9.240/29,51.149.9.112/29,51.149.8.0/25,165.225.80.0/22,147.161.166.0/23,165.225.196.0/23,165.225.198.0/23,81.144.180.0/24,165.225.17.0/24,147.161.236.0/23,147.161.224.0/23,165.225.16.0/23,81.150.77.189/32" \
ROUTE_SERVICE_APP_NAME="prometheus-server-proxy-i-dot-ai" \
ROUTE_SERVICE_NAME="prometheus-server-route-i-dot-ai" \
PROTECTED_APP_NAME="prometheus-server" \
./deploy.sh
```

### Alert manager
- CD into directory Metrics/alertmanager
- Set your Cloud Foundry target space to the right one for the one where prometheus-server is running above
- Run `cf push --no-start prometheus-alertmanager`
- Run `cf map-route prometheus-alertmanager apps.internal --hostname prometheus-alertmanager-i-dot-ai`
- Run `cf add-network-policy prometheus-server prometheus-alertmanager --protocol tcp --port 8080`
- Run `cf start prometheus-alertmanager`

### Setup frontend WebUI routing and proxy for Alertmanager
- Run `cf map-route prometheus-alertmanager london.cloudapps.digital --hostname prometheus-alertmanager-i-dot-ai`
- cd to the proxy/ folder
- Run 
```bash
ALLOWED_IPS="51.149.9.240/29,51.149.9.112/29,51.149.8.0/25,165.225.80.0/22,147.161.166.0/23,165.225.196.0/23,165.225.198.0/23,81.144.180.0/24,165.225.17.0/24,147.161.236.0/23,147.161.224.0/23,165.225.16.0/23,81.150.77.189/32" \
ROUTE_SERVICE_APP_NAME="prometheus-alertmanager-proxy-i-dot-ai" \
ROUTE_SERVICE_NAME="prometheus-alertmanager-route-i-dot-ai" \
PROTECTED_APP_NAME="prometheus-alertmanager" \
./deploy.sh
```




---

### Database for Grafana
- Make sure you're targeting the space where you're setting up metrics
- Run `cf create-service postgres small-11 grafana-postgresdb`

### Grafana
- Cd to the Grafana directory
- Run `cf create-app grafana-server --no-route`
- Run `cf bind-service grafana-server grafana-postgresdb`
- Run `cf map-route grafana-server cloudapps.digital --hostname grafana-server-i-dot-ai`
- Run `cf env grafana-server`
- Using the values from the VCAP_SERVICES output to fill in the GF_DATABASE_* values in `manifest.yml`.
  - Also make up values for ADMIN_USER, ADMIN_PASS, and SECRET_KEY
- Run `cf add-network-policy grafana-server prometheus-server --protocol tcp --port 8080`
- Run `cf apply-manifest -f manifest.yml`
- Run `cf push grafana-server`

## Configuration

### Grafana

- Login to the Grafana site
- Create a dashboard
- Go to the settings (cog icon)
- Select `JSON Model`
- Paste in the contents of `dev-dashboard.json`
