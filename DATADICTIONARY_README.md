D2W LOGISTICS DATA DICTIONARY
-----------------------------

Database name: "d2wLogisticsDB" (as set up in .env file)

Collection names: "Users", "Capacities", "Inquiries"

"Users" field names:
  - First name: "firstName"
  - Last name: "lastName"
  - Company name: "companyName"
  - Primary market/type of goods transported: "goodsType"
  - Email address: "email"
  - Mobile phone number: "mobilePhone"
  - Password: "password" (encrypted)

"Capacities" field names:
  - Departure Date: "departureDate"
  - Departure Port: "departurePort"
  - Destination Port: "destinationPort"
  - Forties/FEUs Available: "numFeuAvailable"
  - Type of goods allowed: "goodsType"
  - Refrigerated: "isRefrigerated"
  - Hazardous: "allowHazardous"

"Inquiries" field names:
  - Capacity ID: "capacity_id" (foreign key to Capacities)
  - Date needed: "dateNeeded"
  - Destination port: "destinationPort"
  - Contact email address: "contactEmail"
               
