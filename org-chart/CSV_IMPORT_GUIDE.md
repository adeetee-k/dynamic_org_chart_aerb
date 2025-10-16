# CSV Import/Export Guide

## Overview
The organizational chart application now supports importing and exporting employee data via CSV files. This allows you to:
- Replace fake data with real employee information
- Update employee data without touching code
- Maintain the organizational chart using spreadsheet software
- Export current data for backup or analysis

## CSV Format

### Required Columns
The CSV file must contain these columns (in any order):
- `id` - Unique identifier for each employee
- `name` - Employee's full name
- `designation` - Job title/role (e.g., Chairperson, Director, Head, PA)

### Optional Columns
- `promotionDate` - Date of promotion (YYYY-MM-DD format)
- `dateOfBirth` - Employee's birth date (YYYY-MM-DD format)
- `photoUrl` - URL to employee photo (leave empty for placeholder)
- `managerId` - ID of the employee's manager (leave empty for top-level employees)

### Example CSV Structure
```csv
id,name,designation,promotionDate,dateOfBirth,photoUrl,managerId
e1,John Smith,Chairperson,2015-01-15,1965-03-10,
e2,Sarah Johnson,Director,2016-03-12,1972-07-22,e1
e3,Michael Brown,Director,2017-05-20,1974-01-09,e1
h21,David Wilson,Head,2019-01-01,1980-02-02,e2
pa1,Alice Thompson,PA,2015-02-01,1985-01-15,e1
```

## How to Use

### 1. Import CSV Data
1. Click the **"Import/Export CSV"** button above the organizational chart
2. Click **"Choose File"** and select your CSV file
3. The application will automatically load the new data and refresh the chart
4. If there are any errors, the application will fall back to default data

### 2. Export Current Data
1. Click the **"Import/Export CSV"** button
2. Click **"Export to CSV"** to download the current data
3. Use this as a template or backup

### 3. Download Template
1. Click the **"Import/Export CSV"** button
2. Click **"Download Template"** to get a sample CSV file
3. Modify the template with your real employee data

## Important Notes

### Hierarchy Rules
- **Top-level employees** (like Chairperson) should have no `managerId`
- **Direct reports** should reference their manager's `id` in the `managerId` column
- **PAs** should reference their manager's `id` (Chairperson, Director, or Head)

### Data Validation
- The application validates that required fields are present
- Invalid CSV files will fall back to default data
- Employee IDs must be unique
- Manager IDs must reference existing employees

### Supported Designations
The application recognizes these job titles:
- Chairperson (Level 1)
- Director (Level 2)
- Head, CAO, DCA (Level 3)
- Section Head (Level 4)
- SOF, SOE, SOD, SOC (Levels 5-8)
- Manager, Staff (Levels 9-10)
- PA (Level 11 - Personal Assistants)

## Sample Data

A complete sample CSV file (`sample-data.csv`) is included in the project root. This file demonstrates:
- Proper hierarchy structure
- All required and optional columns
- Realistic employee names and dates
- Correct manager relationships

## Troubleshooting

### Common Issues
1. **"Missing required headers"** - Ensure your CSV has `id`, `name`, and `designation` columns
2. **"Invalid CSV format"** - Check for proper comma separation and quoted values
3. **"No data loaded"** - Verify that employee IDs and manager IDs are correctly linked

### Best Practices
1. **Use unique IDs** - Avoid duplicate employee IDs
2. **Check manager relationships** - Ensure all manager IDs exist in the employee list
3. **Validate dates** - Use YYYY-MM-DD format for dates
4. **Test with small files** - Start with a few employees before importing large datasets

## Technical Details

### File Processing
- CSV files are processed client-side using JavaScript
- No data is sent to external servers
- File size should be reasonable (< 1MB for typical use cases)

### Data Persistence
- Imported data is stored in memory during the session
- Data is not permanently saved (refreshing the page will restore default data)
- For permanent storage, consider implementing a backend database

### Browser Compatibility
- Works in all modern browsers
- Requires JavaScript to be enabled
- File input support required for CSV upload
