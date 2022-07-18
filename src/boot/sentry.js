import { boot } from "quasar/wrappers";
import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";

export default boot(({ Vue, router }) => {
  Sentry.init({
    Vue,
    dsn: "https://bb27cc919d6246eda40c52ab33ca9b07@o1314025.ingest.sentry.io/6570324",
    logErrors: true,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    beforeSend(event) {
      // Check if it is an exception, and if so, show the report dialog
      if ((event.exception)) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    },
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
});
