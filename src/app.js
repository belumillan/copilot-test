const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use('/api/blogs', blogRoutes);

// Serve OpenAPI YAML file
app.use('/docs/openapi.yaml', express.static(path.join(__dirname, '../openapi.yaml')));

// Serve Swagger UI for API docs
app.use('/docs', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Blog API Docs</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          window.onload = function() {
            SwaggerUIBundle({
              url: '/docs/openapi.yaml',
              dom_id: '#swagger-ui',
            });
          };
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
