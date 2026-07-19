(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "browse_products",
        description: "Browse peptide products by category",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string", description: "The specific category to view" }
          }
        },
        execute: async ({ category }) => {
          const url = category ? `https://DOMAIN.com/shop?category=${encodeURIComponent(category)}` : `https://DOMAIN.com/shop`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "contact",
        description: "Get contact and support information",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/contact`;
          return { url: `https://DOMAIN.com/contact` };
        }
      },
      {
        name: "faq",
        description: "View frequently asked questions and rules",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/faq`;
          return { url: `https://DOMAIN.com/faq` };
        }
      },
      {
        name: "wholesale_inquiry",
        description: "Open the wholesale or custom synthesis request page",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/wholesale`;
          return { url: `https://DOMAIN.com/wholesale` };
        }
      }
    ]
  });
})();
