# Contract UI - Service Agreement Renderer

This React application dynamically renders structured contract documents from JSON data. It supports formatted text, hierarchical clause numbering, and highlighted mentions, ensuring a clean and professional presentation.

## Features

* **Dynamic Document Rendering**: Converts structured JSON data into properly formatted HTML documents.
* **Hierarchical Clause Numbering**: Implements continuous numbering throughout documents with nested clause structures (e.g., 1, 2, 3 → (a), (b), (c) → (i), (ii), (iii)).
* **Text Formatting**: Supports bold, italic, and underline styles.
* **Mention Highlighting**: Displays variable text with customizable colored backgrounds.
* **Responsive Design**: Ensures readability and usability on all devices.
* **Nested Structures Handling**: Correctly manages nested clauses and lists.

## Requirements Met

* Clause rendering with accurate hierarchical numbering and indentation
* Highlighting of mentions with dynamic background colors
* Full support for bold, italic, and underline formatting
* Professional, consistent styling matching the provided design
* Modular, extensible architecture enabling easy future enhancements

## Installation & Setup

1. Clone or download the repository.
2. Navigate to the project directory and install dependencies:

   ```bash
   npm install
   ```
3. Launch the development server:

   ```bash
   npm start
   ```
4. Open your browser to `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   ├── BlockRenderer.js    // Main component for rendering document blocks
│   ├── TextWithMarks.js    // Handles text formatting and mentions
│   ├── ClauseRenderer.js   // Manages rendering and numbering of clauses
│   └── Mention.js          // Displays mentions with highlighting
├── data/
│   └── input.json          // JSON document data
├── App.js                  // Main application component
├── styles.css              // Application styling
└── index.js                // Entry point of the application
```

## Key Components

### BlockRenderer

* Handles various document elements, including headings, paragraphs, lists, and clauses.
* Manages the document structure and properly renders nested components.

### TextWithMarks

* Processes and applies text formatting such as bold, italic, and underline.
* Handles rendering of mention elements.
* Converts newline characters into HTML `<br>` elements.

### ClauseRenderer

* Implements hierarchical numbering for clauses.
* Supports multiple levels of nested clauses with distinct numbering styles.

### Mention

* Displays dynamic text elements with colored highlights.
* Configured for easy extension to enable future editing and real-time updates.

## JSON Data Structure

The application expects JSON data formatted as follows:

```json
{
  "type": "clause|p|h1|h4|ul|li|mention|block",
  "children": [...],
  "text": "string",
  "bold": true|false,
  "italic": true|false,
  "underline": true|false,
  "color": "rgb(r,g,b)",
  "value": "string"
}
```

## Styling Features

* Modern, professional typography
* Clean and consistent spacing and layout
* Accurate indentation and clause numbering
* Responsive design to ensure usability across devices

## Build & Deployment

To create a production build:

```bash
npm run build
```

The `build` directory will contain optimized assets ready for deployment.

## Testing

The application has been tested and verified to:

* Render complete documents accurately from JSON data.
* Correctly display hierarchical numbering for clauses and nested clauses.
* Highlight mentions appropriately.
* Apply text formatting consistently.
* Maintain a responsive and accessible layout.

## Output Screenshots

image.png
