import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "nordstjernen-assistant",
  version: "1.0.0",
});

server.tool(
  "get_ship_info",
  "Get information about the Nordstjernen sailing ship — its history, type, and features",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          name: "Nordstjernen",
          built: 1920,
          origin: "Skagen, Denmark",
          type: "Haikutter (traditional gaff-rigged cutter)",
          history:
            "Built as a working fishing cutter in Skagen, Denmark in 1920. " +
            "Named after the North Star (Nordstjernen), she has sailed the North and Baltic Sea for over 100 years. " +
            "Originally used for hard commercial fishing, she now offers adventure sailing holidays.",
          current_use: "Leisure sailing tours, private charters, and event rentals",
          seas: ["Baltic Sea (Ostsee)", "North Sea (Nordsee)"],
          highlights: [
            "100+ year old traditional sailing vessel",
            "Authentic seafaring experience",
            "Overnight stays on board possible",
            "Available for private and corporate events",
          ],
        }),
      },
    ],
  })
);

server.tool(
  "get_tours_info",
  "Get information about available sailing tours, holiday trips, and event charters",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          tour_types: [
            {
              type: "Urlaubstörns (Holiday Sailing Trips)",
              description:
                "Multi-day sailing holidays on the Baltic Sea. Choose between a sporty approach or relaxed harbour-to-harbour cruising.",
              highlights: [
                "Quiet anchorages",
                "Scenic harbour evenings",
                "Baltic Sea island stops",
              ],
              contact: "segeln@nordstjernen.de",
            },
            {
              type: "Events & Private Charter",
              description:
                "Rent the entire ship for your special occasion. Great for weddings, birthdays, and business events.",
              occasions: [
                "Weddings (Hochzeiten)",
                "Birthday celebrations",
                "Business partner meetings",
                "Corporate team events",
              ],
              festivals: [
                "Hamburger Hafengeburtstag",
                "Kieler Woche",
                "Hanse Sail Rostock",
                "Rum Regatta Flensburg",
              ],
            },
            {
              type: "Aktion / Team Building",
              description:
                "Spend a few exciting hours on board with your team. Overnight stays on board are possible.",
              suitable_for: [
                "Colleagues",
                "Employees",
                "Apprentices (Auszubildende)",
                "Sports clubs",
                "Business partners",
              ],
            },
          ],
          booking_note:
            "Contact us directly for dates, group size and pricing. We tailor packages to your needs.",
        }),
      },
    ],
  })
);

server.tool(
  "get_contact_info",
  "Get contact details, email addresses, and how to make a booking inquiry",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          company: "Nordstjernen gGmbH",
          address: {
            street: "Torfwiesenau 10",
            city: "24226 Heikendorf",
            country: "Germany",
          },
          phone: "0431 / 53 32 36 51",
          emails: {
            general_management: "gf@nordstjernen.de",
            tour_inquiries: "segeln@nordstjernen.de",
            technical_support: "webmaster@nordstjernen.de",
          },
          social_media: ["Facebook", "Instagram"],
          booking_tip:
            "For tour bookings and availability, email segeln@nordstjernen.de with your preferred dates and group size.",
        }),
      },
    ],
  })
);

server.tool(
  "check_availability",
  "Get general guidance on availability and the best way to check for specific dates",
  {
    month: z.string().describe("Month of interest, e.g. 'Juli', 'August'"),
    year: z.string().optional().describe("Year, e.g. '2025'"),
    group_size: z
      .number()
      .optional()
      .describe("Number of people in your group"),
    event_type: z
      .string()
      .optional()
      .describe("Type of event, e.g. 'private charter', 'holiday trip'"),
  },
  async ({ month, year, group_size, event_type }) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          message: `To check availability for ${month}${year ? " " + year : ""}${group_size ? ` for ${group_size} people` : ""}${event_type ? ` (${event_type})` : ""}, please reach out directly.`,
          action:
            "Email segeln@nordstjernen.de with your preferred dates, group size, and the type of trip you have in mind. We will get back to you promptly with options.",
          tips: [
            "Peak season is June–August — book early to secure your dates.",
            "Private charters and events can often be arranged outside peak season too.",
            "Overnight stays on board are available for multi-day trips.",
          ],
          phone: "0431 / 53 32 36 51",
        }),
      },
    ],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
