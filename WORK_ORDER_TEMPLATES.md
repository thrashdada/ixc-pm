# Work Order Templates

This feature allows property managers to create and manage reusable templates for common maintenance tasks, streamlining the work order creation process.

## Features

### Template Management
- **View Templates**: Browse all available templates with filtering by category and priority
- **Create Templates**: Build new templates with detailed instructions, checklists, and material requirements
- **Edit Templates**: Modify existing templates to improve processes
- **Delete Templates**: Remove outdated or unused templates
- **Template Usage Tracking**: Monitor how often templates are used

### Template Components
Each template includes:
- **Basic Information**: Name, description, category, priority
- **Time & Cost Estimates**: Duration and cost estimates for planning
- **Step-by-Step Instructions**: Detailed procedures for contractors
- **Checklist Items**: Required completion steps
- **Required Materials**: Tools and materials needed
- **Default Assignment**: Pre-selected contractor (optional)

### Integration with Work Orders
- **Template Selection**: Choose from templates when creating new work orders
- **Auto-Population**: Templates automatically fill in title, description, priority, and assignee
- **Consistency**: Ensures standardized procedures across similar maintenance tasks

## File Structure

```
src/
├── app/
│   └── work-orders/
│       └── templates/
│           ├── page.tsx                    # Templates listing page
│           └── create/
│               └── page.tsx                # Create new template page
├── components/
│   └── work-orders/
│       ├── WorkOrderTemplatesContent.tsx   # Templates management UI
│       └── CreateTemplateContent.tsx       # Template creation/edit form
└── lib/
    └── types.ts                            # WorkOrderTemplate interface
```

## Usage

### Accessing Templates
1. Navigate to **Work Orders** in the sidebar
2. Click **Templates** to view all available templates
3. Use filters to find specific templates by category or priority

### Creating a Template
1. Click **Create Template** button
2. Fill in the template details:
   - Name and description
   - Category and priority
   - Estimated duration and cost
   - Step-by-step instructions
   - Checklist items
   - Required materials
   - Default assignee (optional)
3. Save the template

### Using Templates
1. When creating a new work order, select a template from the dropdown
2. The form will be pre-filled with template data
3. Modify as needed for the specific situation
4. Submit the work order

## Template Categories
- **Plumbing**: Leak repairs, fixture installations, pipe maintenance
- **Electrical**: Outlet repairs, lighting, electrical safety
- **HVAC**: Filter changes, system maintenance, temperature control
- **Carpentry**: Repairs, installations, woodwork
- **Cleaning**: Deep cleaning, maintenance cleaning
- **Other**: Miscellaneous maintenance tasks

## Priority Levels
- **Low**: Routine maintenance, non-urgent repairs
- **Medium**: Standard repairs, scheduled maintenance
- **High**: Important repairs, tenant requests
- **Urgent**: Emergency repairs, safety issues

## Benefits
- **Time Savings**: Quick work order creation from templates
- **Consistency**: Standardized procedures across properties
- **Quality Control**: Pre-defined checklists ensure thorough completion
- **Training**: Templates serve as training materials for new contractors
- **Planning**: Cost and time estimates help with budgeting and scheduling

## Future Enhancements
- Template versioning and history
- Template sharing between properties
- Advanced template conditions (seasonal, property-specific)
- Template analytics and usage reports
- Integration with contractor scheduling
- Mobile template access for field workers 