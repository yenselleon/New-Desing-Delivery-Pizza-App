# Specification: Menu Grid Pagination and Row Constraint

## Overview
The goal of this track is to implement functional pagination for the Menu Grid on the `/menu` page. Currently, the pagination buttons at the bottom of the grid are static. Additionally, the menu must be constrained to show exactly two rows of items per page, regardless of the screen size.

## Functional Requirements
- **Dynamic Pagination:** Implement state-based pagination to navigate through the menu items.
- **Two-Row Constraint:** Calculate the number of items per page dynamically based on the responsive grid layout to ensure exactly two rows are displayed:
  - Mobile (1 column): 2 items per page.
  - Medium (2 columns): 4 items per page.
  - Large (3 columns): 6 items per page.
  - Extra Large (4 columns): 8 items per page.
- **Interactive Controls:** The pagination buttons (1, 2, 3...) at the bottom of the grid must update the current page and refresh the displayed items.

## Acceptance Criteria
- [ ] Clicking a page number updates the grid.
- [ ] Exactly 2 rows of items are shown per page across all breakpoints.
- [ ] The current page is visually highlighted.
