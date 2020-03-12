# Test Cases
## Key

A subversion is something the bot could do that needs defined behavior.
Each test case checks that each button and field is visible before doing some action on them.

## Automatable
### Register a New User
1. Click `Register` button
2. Enter each field with dummy/bot values
3. Click `Done` button
#### Subversions
- Leaving some or all fields blank 
- Use a non-email address (e.g.: bot@bot, Tom, etc@etc.)
- ?Put multiple words in first name field?
- Put multiple words in username field

### Login Current User 
1. Enter correct login information 
2. Click `Sign in` button
3. See chat area
#### Subversions
- Leaving some or all fields blank 
- Using a nonexistent username
- Using incorrect password

### Login a New User
Composed of:
1. Register a New User
2. Login Current User

### Chat
1. Login Current User
2. Enter some text
3. Submit text
4. Wait for response
#### Subversions
- Submit no text

## Human Required
To Be Decided
