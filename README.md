# convert-to-pdf

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
    // executable path for Puppeteer. Default path provided by puppeteer will be used if this option is not provided.
    puppeteerExecPath: 'Puppeteer executable path',
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
    template: {
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
      header: HTML template for the print header. Should be valid HTML markup. the following classes can be used to inject printing values:
        - `date` formatted print date
        - `title` document title
        - `url` document location
        - `pageNumber` current page number
        - `totalPages` total pages in the document
      footer: HTML template for the print footer. Should use the same format as the header.
    },
    // Url options
    url: {
      link: URL to render - string
      auth: Authentication for the given url(if required) - object - keys: username, password
    }
    data: Data to render on template - object,
    // Additional data to render on template. For example, Can be used to provide translations on the template. Check the second example below
    additionalData: {
      resourceType: Type of resource data - string - values: FILE/CONTENT - (default: CONTENT),
      data: Data to render - object | string - (file path if type is FILE or JSON object if type is CONTENT )
    }
}
```

> At least one of template or url must be specified.

> For more information about the options, see the documentation for puppeteer [here](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md)

## Examples

```javascript
import { htmlToPdf } from 'convert-to-pdf';

const options = {
  // template options
  template: {
    type: 'FILE', // If the template is in the form of a file
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
// here pdf is in the form of Buffer
```

```javascript
import { htmlToPdf } from 'convert-to-pdf';

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
          <h1>{{HELLO}} {{name}}!</h1>
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
  // additional data, used here as translations key/value
  additionalData: {
    resourceType: 'CONTENT',
    data: {
      HELLO: 'Hej'
    }
  }
};
await htmlToPdf(options);
// Here PDF will be piped to the specified writable stream
```
