import React from "react";
import axios from "axios";
import APIs from "../Main/apis_data/APIs";
import "./DeveloperDashboard.css";

axios.defaults.withCredentials = true;

const StatCard = ({ label, value, detail }) => (
  <article className="developer-stat-card">
    <span>{label}</span>
    <strong>{value}</strong>
    <small>{detail}</small>
  </article>
);

const TrafficBars = ({ data = [], field = "requests", tone = "primary" }) => {
  const max = Math.max(...data.map((item) => item[field] || 0), 1);
  return (
    <div className={`developer-bars developer-bars-${tone}`}>
      {data.slice(-24).map((item) => (
        <div className="developer-bar-slot" key={`${field}-${item.minute}`}>
          <span
            className="developer-bar"
            style={{ height: `${Math.max(((item[field] || 0) / max) * 100, 4)}%` }}
            title={`${item.minute}: ${item[field] || 0}`}
          />
        </div>
      ))}
    </div>
  );
};

const ApiTable = ({ routes = [] }) => (
  <div className="developer-table-wrap">
    <table className="developer-table">
      <thead>
        <tr>
          <th>Method</th>
          <th>Route</th>
          <th>Group</th>
          <th>Access</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route) => (
          <tr key={`${route.method}-${route.path}`}>
            <td>
              <span className={`developer-method method-${route.method.toLowerCase()}`}>
                {route.method}
              </span>
            </td>
            <td>{route.path}</td>
            <td>{route.group}</td>
            <td>{route.access}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const routeMethods = ["ALL", "GET", "POST", "PUT", "PATCH", "DELETE"];

const methodSort = (method) => {
  const index = routeMethods.indexOf(method);
  return index === -1 ? 99 : index;
};

const groupRoutesBy = (routes = [], key = "group") =>
  routes.reduce((groups, route) => {
    const group = route[key] || "Other APIs";
    if (!groups[group]) groups[group] = [];
    groups[group].push(route);
    return groups;
  }, {});

export default function DeveloperDashboard() {
  const [docs, setDocs] = React.useState(null);
  const [metrics, setMetrics] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [methodFilter, setMethodFilter] = React.useState("ALL");
  const [groupFilter, setGroupFilter] = React.useState("ALL");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const loadDeveloperData = React.useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const [docsResponse, metricsResponse] = await Promise.all([
        axios.get(APIs.developer_apis.api_docs),
        axios.get(APIs.developer_apis.api_metrics),
      ]);
      setDocs(docsResponse.data);
      setMetrics(metricsResponse.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to load developer API dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadDeveloperData();
    const timer = setInterval(loadDeveloperData, 30000);
    return () => clearInterval(timer);
  }, [loadDeveloperData]);

  const filteredRoutes = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    const routes = docs?.routes || [];
    return routes.filter((route) => {
      const methodMatches = methodFilter === "ALL" || route.method === methodFilter;
      const groupMatches = groupFilter === "ALL" || route.group === groupFilter;
      const searchMatches =
        !needle ||
        [route.method, route.path, route.group, route.access]
        .join(" ")
        .toLowerCase()
          .includes(needle);
      return methodMatches && groupMatches && searchMatches;
    });
  }, [docs, query, methodFilter, groupFilter]);

  const visibleGroups = React.useMemo(() => groupRoutesBy(filteredRoutes), [filteredRoutes]);
  const availableGroups = React.useMemo(() => docs?.groups || [], [docs]);
  const availableMethods = React.useMemo(
    () =>
      ["ALL", ...(docs?.methods || []).sort((a, b) => methodSort(a) - methodSort(b))],
    [docs],
  );

  const totals = metrics?.totals || {};

  return (
    <section className="developer-dashboard-page">
      <header className="developer-dashboard-header">
        <div>
          <p className="developer-dashboard-eyebrow">Developer Operations</p>
          <h1>API Docs and Traffic Dashboard</h1>
          <p>
            Live route catalogue, request activity, slow endpoints, and spike tracking for
            the JNTU-GV API service.
          </p>
          <a
            className="developer-docs-link"
            href={APIs.developer_apis.api_docs}
            target="_blank"
            rel="noreferrer"
          >
            Open /api/docs JSON
          </a>
        </div>
        <button type="button" onClick={loadDeveloperData}>
          Refresh
        </button>
      </header>

      {error && <div className="developer-alert">{error}</div>}

      <div className="developer-stat-grid">
        <StatCard label="Total Requests" value={totals.requests || 0} detail="Since API process start" />
        <StatCard label="Average Latency" value={`${totals.avg_ms || 0} ms`} detail="Across tracked requests" />
        <StatCard label="Error Rate" value={`${totals.error_rate || 0}%`} detail={`${totals.errors || 0} errors`} />
        <StatCard label="Documented Routes" value={docs?.route_count || 0} detail={`${docs?.groups?.length || 0} groups`} />
      </div>

      <div className="developer-chart-grid">
        <article className="developer-panel">
          <div className="developer-panel-head">
            <h2>Request Spikes</h2>
            <span>Last 24 minutes</span>
          </div>
          <TrafficBars data={metrics?.timeline || []} field="requests" />
        </article>
        <article className="developer-panel">
          <div className="developer-panel-head">
            <h2>Latency Pattern</h2>
            <span>Average ms</span>
          </div>
          <TrafficBars data={metrics?.timeline || []} field="avg_ms" tone="latency" />
        </article>
      </div>

      <div className="developer-grid-two">
        <article className="developer-panel">
          <div className="developer-panel-head">
            <h2>Slowest APIs</h2>
            <span>Average response time</span>
          </div>
          <div className="developer-route-list">
            {(metrics?.slowest_routes || []).map((route) => (
              <div className="developer-route-row" key={route.route}>
                <span>{route.route}</span>
                <strong>{route.avg_ms} ms</strong>
              </div>
            ))}
            {!loading && !(metrics?.slowest_routes || []).length && (
              <p className="developer-empty">No route timing data yet.</p>
            )}
          </div>
        </article>

        <article className="developer-panel">
          <div className="developer-panel-head">
            <h2>Recent Spikes</h2>
            <span>Slow or failed responses</span>
          </div>
          <div className="developer-route-list">
            {(metrics?.spikes || []).slice(0, 8).map((spike) => (
              <div className="developer-route-row" key={`${spike.at}-${spike.route}`}>
                <span>{spike.route}</span>
                <strong>{spike.duration_ms} ms / {spike.status}</strong>
              </div>
            ))}
            {!loading && !(metrics?.spikes || []).length && (
              <p className="developer-empty">No spikes recorded.</p>
            )}
          </div>
        </article>
      </div>

      <article className="developer-panel developer-docs-panel">
        <div className="developer-panel-head">
          <div>
            <h2>API Route Documentation</h2>
            <span>
              {filteredRoutes.length} visible routes from {docs?.route_count || 0} total
            </span>
          </div>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search route, method, group..."
          />
        </div>

        <div className="developer-filter-block">
          <div className="developer-filter-row">
            {availableMethods.map((method) => (
              <button
                type="button"
                key={method}
                className={
                  methodFilter === method
                    ? "developer-filter-pill developer-filter-pill-active"
                    : "developer-filter-pill"
                }
                onClick={() => setMethodFilter(method)}
              >
                {method}
                <span>{method === "ALL" ? docs?.route_count || 0 : docs?.method_counts?.[method] || 0}</span>
              </button>
            ))}
          </div>

          <div className="developer-filter-row developer-group-filter-row">
            <button
              type="button"
              className={
                groupFilter === "ALL"
                  ? "developer-filter-pill developer-filter-pill-active"
                  : "developer-filter-pill"
              }
              onClick={() => setGroupFilter("ALL")}
            >
              All APIs
              <span>{docs?.route_count || 0}</span>
            </button>
            {availableGroups.map((group) => (
              <button
                type="button"
                key={group}
                className={
                  groupFilter === group
                    ? "developer-filter-pill developer-filter-pill-active"
                    : "developer-filter-pill"
                }
                onClick={() => setGroupFilter(group)}
              >
                {group}
                <span>{docs?.group_counts?.[group] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="developer-empty">Loading API documentation...</p>
        ) : filteredRoutes.length ? (
          <div className="developer-api-group-stack">
            {Object.entries(visibleGroups)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([group, routes]) => {
                const routesByMethod = groupRoutesBy(
                  routes.sort((a, b) =>
                    methodSort(a.method) - methodSort(b.method) || a.path.localeCompare(b.path),
                  ),
                  "method",
                );
                return (
                  <section className="developer-api-group" key={group}>
                    <div className="developer-api-group-head">
                      <h3>{group}</h3>
                      <span>{routes.length} routes</span>
                    </div>
                    {Object.entries(routesByMethod)
                      .sort(([a], [b]) => methodSort(a) - methodSort(b))
                      .map(([method, methodRoutes]) => (
                        <div className="developer-api-method-section" key={`${group}-${method}`}>
                          <div className="developer-api-method-title">
                            <span className={`developer-method method-${method.toLowerCase()}`}>
                              {method}
                            </span>
                            <strong>{methodRoutes.length} endpoints</strong>
                          </div>
                          <ApiTable routes={methodRoutes} />
                        </div>
                      ))}
                  </section>
                );
              })}
          </div>
        ) : (
          <p className="developer-empty">No API routes match the selected filters.</p>
        )}
      </article>
    </section>
  );
}
