# 🐝 Nektar Home Assignment

Nektar syncs data from various sources, including Gmail and Google Calendar. We process them to extract out information.

This is a starter template that uses Express and Mocks google APIs. You will need to extend this template to implement the APIs as described.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- TypeScript knowledge

### Installation

1. Download the starter template and extract it to a new directory:

   ```bash
   cd [starter-template-directory]
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### 🏃 Running the Application

1. Development mode:

   ```bash
   npm run dev [test-case-number]
   ```

2. Production mode:

   ```bash
   npm run build
   npm start [test-case-number]
   ```

This will start the server on port `3000`. Optionally, you can specify a test case number as a parameter.

Test case number, defaults to `1`, uses the test case defined in the `/tests` folder. You can add more test cases and run them. For example, `npm run dev 2` will use `2.json` in `/tests` as test data.

> [!NOTE]
> Your code will be evaluated against some hidden test cases post submission.

---

### 💼 Assignment

To give you a head start, we have already implemented a few APIs as documented in `api-docs.md`. Your task is to extend the starter template to implement the following APIs:

### Primary APIs

1. `/api/contact`: Extracts all contacts from the given email messages and calendar events. De-duplicate them.

   - Add an optional parameter `limit` to limit the number of contacts to be returned.
   - Add an optional parameter `offset` to skip the first `offset` contacts.
   - Add an optional parameter `ignoreDomains`. This will be a list of domains. If an email or calendar event _only_ has participants from the list of these domains, then ignore that email/calendar event.
   - Add an optional parameter `blockDomains`. This will be a list of domains. If any email or calendar event has _at least one_ of the participant with such domain, then ignore that email/calendar event.

   The `Response` should be `PaginatedResponse<Contact>` where Contact is defined like:

   ```typescript
   interface Contact {
     email: string; // Primary key
     firstName: string;
     lastName: string;
     domain: string;
   }
   ```

   All types are defined [here](./src/types/index.ts).

### 🤓 Bonus APIs

1. `api/contact/:contact-email`: Returns the contact with the given email address.

   `Response`: `SingleItemResponse<Contact>`

1. `/api/gmail/:contact-email`: Returns the email messages for the given contact email.

   `Response`: `PaginatedResponse<GmailMessage>`

1. `/api/calendar/:contact-email`: Returns the calendar events for the given contact email.

   `Response`: `PaginatedResponse<CalendarEvent>`

1. `api/gmail`: Add an optional parameter `sort` to sort the email messages by the given field. The default sort field is `internalDate`.

   `Response`: `PaginatedResponse<GmailMessage>`

1. `api/calendar`: Add an optional parameter `sort` to sort the calendar events by the given field. The default sort field is `start.dateTime`.

   `Response`: `PaginatedResponse<CalendarEvent>`

> [!TIP]
> Since time is limited, we recommened that you start with an API and deliver it completely along with the documentation and additional tests (if required) before moving on to the next one.

> [!NOTE]
> If there is any ambiguity in the requirements, you should make reasonable assumptions and to complete the assignment.

---

### 🧐 Evaluation

You can use this starter template to complete the assignment. You can modify the code to implement the requirements. You will be given a total of 1.5 hours to this. You will be evaluated on the following criteria:

- Completeness of the assignment (Primary API + Number of Bonus APIs Completed)
- Correctness of the implementation
- Efficiency of the implementation (Time and space complexities wherever applicable)
- Readability of the code
- Testing (You can add more tests in the `/tests` folder)
- Documentation of the code (Extend [api-docs.md](api-docs.md) and [openapi.yaml](openapi.yaml) file)

---

### 📖 Submission

Your assignment should be submitted in one of the following ways:

1. Zip your code (no .7z or .rar etc. Only zip file), upload it to your Cloud drive (Google drive or Dropbox etc), share the zip _publicly_, and then share the link with our HR

In case you want to add any assumptions or other documentation, please create a `submission.md` file and write your thoughts there.

**Note: Please do not commit or zip the `node_modules` folder in your submission.**



// task description 
folder structure 
index.ts
routes 
   contactRoutes
service
   contact service
      contact.service.ts
   helper
      contactHelper.service.ts
   util
      errorHandlers
         baseError.service.ts 
         error.service.ts
         globalError.ts
      contactUtil.service.ts

curl to test

curl --location 'http://localhost:3000/api/contact?limit=2&offset=1&ignoreDomains=med.com&blockDomains=metro.com' \
--header 'Content-Type: application/json' \
--data ''

  METHOD GET 
  END POINT /api/contact
  query params 
   limit , offset ,ignoreDomains ,blockDomains
  RESPONSE 
  {
    "data": [
        {
            "email": "jik@med.com",
            "firstName": "",
            "lastName": "",
            "domain": "med.com"
        },
        {
            "email": "zak@mp.com",
            "firstName": "",
            "lastName": "",
            "domain": "mp.com"
        }
    ],
    "total": 10,
    "limit": 2,
    "offset": 1
}
   