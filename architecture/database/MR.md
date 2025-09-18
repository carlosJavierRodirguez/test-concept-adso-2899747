# 🎬 Filmoteca – Data Model

## 🧭 Conventions
- Tables and columns use **snake_case**, in **singular**.  
- Primary keys are **UUID** generated with `gen_random_uuid()` (`CREATE EXTENSION pgcrypto;`).  
- **Audit fields (7):**  
  - `status`  
  - `created_at` / `created_by`  
  - `updated_at` / `updated_by`  
  - `deleted_at` / `deleted_by`  
- Foreign Keys use **ON UPDATE CASCADE** and **ON DELETE** rules appropriate to the domain.  
- **Unique constraints** on codes and names (scoped where applicable).  

---

## Module: Content
- **movie** {id, name, release_year, duration, synopsis, director_id, genre_id}  
- **series** {id, name, seasons, synopsis, director_id, genre_id}  
- **genre** {id, name, description}  
- **director** {id, name, nationality} 
---

## Module: Users
- **user** {id, name, email, password_hash, role_id, profile_id}  
- **role** {id, name, description}  
- **profile** {id, avatar_url, preferences, country}  

---

## Module: Interactions
- **review** {id, content, rating, date, user_id, movie_id, series_id}  
- **playlist** {id, name, user_id}  
- **playlist_item** {id, playlist_id, movie_id, series_id}  

---

## 🔗 Key Relationships
- A **movie** belongs to one **genre** and one **director**.  
- A **series** belongs to one **genre** and one **director**.  
- A **user** belongs to a **role** and has one **profile**.  
- A **user** can write **reviews** about **movies** or **series**.  
- A **user** can create multiple **playlists**, which contain movies or series.   
