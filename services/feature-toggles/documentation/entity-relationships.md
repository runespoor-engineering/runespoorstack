# Entity Relationships Diagram

```mermaid
erDiagram
    User {
        uuid id
        uuid[] projectIds
        string username
        string email
        enum role
    }

    Project {
        uuid id
        uuid[] userIds
        uuid[] environmentIds
        uuid[] tagIds
        string name
        uuid accessKey
    }

    Environment {
        uuid id
        uuid[] flags
        string name
    }

    Flag {
        uuid id
        string name
        boolean enabled
        json meta
        string description
        enum modificationLevel
    }

    Tag {
        uuid id
        uuid[] flagIds
        string name
    }

    User }|--o{ Project : creates
    Project ||--o{ Environment : contains
    Project ||--o{ Tag : has
    Environment ||--o{ Flag : contains
    Flag }o--o{ Tag : assigned
```