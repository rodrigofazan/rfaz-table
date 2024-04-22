# RFaz Table
## Description
RFaz Table is a dynamic HTML table generator that builds tables based on JSON data or API responses. Designed to be flexible and easy to use, it supports custom columns, headers, and even allows data fetching from specified APIs.

## Features
- **Dynamic Data Fetching:** Load data from local JSON or external APIs.
- **Customizable Columns:** Define columns with custom names, titles, and data mappings.
- **Responsive Design:** Styled with CSS for a modern and responsive look.

## Usage
### Installation
Include the CSS and JavaScript files in your project directory.

```html
<link rel="stylesheet" href="rfaz-table.css">
<script src="rfaz-table.js"></script>
```

## Basic Example
This example creates a table displaying country data fetched from an API.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rfaz Table Example</title>
    <link rel="stylesheet" href="rfaz-table.css">
    <script src="rfaz-table.js"></script>
</head>
<body>
    <main>
        <table id="rtable"></table>
    </main>
    <script>
        rfazTable({
            tableId: "rtable",
            api: {
                requestOptions: {
                    method: "GET",
                    redirect: 'follow',
                },
                url: "https://restcountries.com/v3.1/all?fields=name,capital,currencies",
            },
            columns: [
                {
                    name: "commonName",
                    title: "Common Name",
                    property: "name.common",
                    type: "string",
                },
                {
                    name: "officialName",
                    title: "Official Name",
                    property: "name.official",
                    type: "string",
                },
                {
                    name: "currencyName",
                    title: "Currency",
                    property: "currencies",
                    type: "object",
                    childProp: "name",
                },
                {
                    name: "capital",
                    title: "Capital",
                    property: "capital",
                    type: "string",
                }
            ],
            footer: true,
        })
    </script>
</body>
</html>
```

Contributing
Contributions are welcome! Please feel free to fork the repository and submit pull requests.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.