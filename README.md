# to-pdf

Convert html to pdf using puppeteer

The module converts the given HTML template to PDF.
The module uses `puppeteer` for creating PDFs and `mustache` for templates

> Soon to come: ejs to PDF

## Methods

- `htmlToPdf`

  ```javascript
      htmlToPdf(options: HtmlToPdfOptions): Promise<Buffer>
  ```

Options available

```javascript
const options = {
    // page options(used for rendering the content via puppeteer) 
    page: { // OPTIONAL
        height: height of page - number - (default: 1600),
        width: width of page - number - (default: 745.60),
    },
    // PDF options(used while creating the PDF)
    pdf: { // OPTIONAL
        writeStream: for stream of PDF - NodeJS.WritableStream - (default: none(i.e. return PDF as Buffer)),
        scale: Scale of the webpage rendering - number - (default: 1) - value must be  between 0.1 and 2,
        format: Paper format - string - (default: 'A4'),
        landscape: Paper orientation - boolean - (default: false),
        margin: Paper margin - object - (default: none) - keys: top, bottom, right, left,
    },
    // Template options(used while rendering by puppeteer)
    template: { // REQUIRED
      type: Type of html template - string - values: FILE/CONTENT - (default: CONTENT)
      content: html template - string - (file path if type is FILE or HTML string if type is CONTENT)
      css: {
          type: Type of css content - string - values: FILE/CONTENT/URL - (default: CONTENT),
          content: css style sheet - string - (file path if type is FILE or CSS string if type is CONTENT or URL )
      },
      script: {
          type: Type of script content - string - values: FILE/CONTENT/URL - (default: CONTENT),
          content: javascript code - string - (file path if type is FILE or code string if type is CONTENT or URL )
      },
      header: HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
        - `date` formatted print date
        - `title` document title
        - `url` document location
        - `pageNumber` current page number
        - `totalPages` total pages in the document
      footer: HTML template for the print footer. Should use the same format as the header.
    },
    data: Data to render with HTML template - object
}
```

> For more information about the options, see the documentation for puppeteer [here](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md)

## Examples

```javascript
const options = {
  // template options
  template: {
    type: 'FILE', // If the template in in the form of a file
    content: path.resolve(__dirname, 'index.html'),
    css: {
      type: 'FILE',
      content: path.resolve(__dirname, 'index.css'),
    },
  },
  // data to render on the template
  data: {
    name: 'John Doe',
  },
};
const pdf = await htmlToPdf(options);
// here pdf is in the for of Buffer
```

```javascript
const options = {
  pdf: {
    writeStream: res // http response as writable stream
  },
  // template options
  template: {
    type: 'CONTENT', // If the template in in the form of a file
    content: `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset='utf-8'>
          <meta http-equiv='X-UA-Compatible' content='IE=edge'>
          <title>Page Title</title>
          <meta name='viewport' content='width=device-width, initial-scale=1'>
      </head>
      <body>
          <h1>Hello {{name}}!</h1>
      </body>
    </html>
`,
    css: {
      type: 'CONTENT',
      content: `
        h1 {
          color: #f00;
        }
      `,
    },
  },
  // data to render on the template
  data: {
    name: 'John Doe',
  },
};
await htmlToPdf(options);
// here pdf is in the for of Buffer
```
