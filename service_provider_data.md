# Style Guide for Service Provider Data
This is a style guide for how to format service provider data. This ensures our database has consistent data and that data can be loaded in properly.

The columns in the `service_provider` table are `name, website, report_year, report_link, expenses, client_total, staff_total, address, notes`

### URLs (website, report_link)
URLs should be properly formatted.
```
www.nexusyouth.ca           # good
nexusyouth.ca               # bad
http://www.nexusyouth.ca    # bad
```

### Report Year
The report year should be a single year. If the report is for a range, take the latest year.

```
2017        # good
2016-2017   # bad
2016/2017   # bad
?           # bad
```

### Budget
The budget should be the total expenses of the organization for the year. There should be no whitespace between numbers.

TODO: verify that we want to use expenses as the operating budget

```
102248      # good
102,248     # bad
102 248     # bad
```

### Client Total, Staff Total
These counts should be integers. Comments about the totals should be put in the `notes` column.

TODO: how do we count clients served if the org provides multiple counts for multiple services
TODO: how do we distinguish between youth clients and general clients

```
70              # good
6282 children!  # bad
~30             # bad
30-50           # bad
```

### Address
The address should be formatted like so: `unit - number street, city, province postal_code`. If in doubt, use the same formatting as the one on Google Maps.

```
646 St Clair Ave W, Toronto, ON M6C 1A9             # good
646 st clair avenue west toronto ontario m6c 1a9    # bad
```

### Notes
The notes can be used for anything currently.


