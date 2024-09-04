# Cabinet Guru

Cabinet Guru is a comprehensive web application for cabinet planning and calculation. It allows users to input cabinet specifications, manage cabinet runs, and generate detailed reports for cabinet projects.

## Features

- Add and manage individual cabinets with detailed specifications
- Create and manage cabinet runs for both upper and base cabinets
- Calculate linear footage for edge banding
- Generate detailed reports including trim items and cabinet lists
- Auto-save functionality to prevent data loss
- Drag-and-drop interface for easy cabinet organization
- Edit existing cabinets in the list

## Project Structure

```
cabinet-guru/
│
├── index.html
├── README.md
├── css/
│   └── cabinet-guru.css
│
└── js/
    ├── cabinet-guru-utils.js
    ├── cabinet-guru-ui.js
    ├── cabinet-guru-storage.js
    ├── cabinet-guru-cabinet-management.js
    ├── cabinet-guru-run-management.js
    └── cabinet-guru-core.js
```

## Setup

1. Clone the repository
2. Ensure all JavaScript files are in the correct order in your HTML file:
   ```html
   <script src="js/cabinet-guru-utils.js"></script>
   <script src="js/cabinet-guru-ui.js"></script>
   <script src="js/cabinet-guru-storage.js"></script>
   <script src="js/cabinet-guru-cabinet-management.js"></script>
   <script src="js/cabinet-guru-run-management.js"></script>
   <script src="js/cabinet-guru-core.js"></script>
   ```
3. Open `index.html` in a web browser

## Usage

1. Enter job details (name, room, ceiling height)
2. Add cabinets using the input form
3. Create cabinet runs and organize cabinets using drag-and-drop
4. Edit existing cabinets by clicking the "Edit" button in the cabinet list
5. View the generated report for trim calculations and cabinet lists

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.