# What is it

Small utility to make avatar image from given name and surname

## How to use
### install
```shell
npm i avatar-by-initials
```

### use in the code:
- to get file or base64 string:

```ts
import initialsAvatarGen from 'avatar-by-initials';

// ....

const avatarBlob = initialsAvatarGen({
  circleColor: '#ff632e',
  fontColor: '#ffffff',
  fontName: 'Open Sans',
  fontSize: 55,
  nameAndSurname: `John Doe`,
  size: 200,
})?.toFile(); // or .toBase64()  if you need base64 encoded string.
```

- if you want to get blob object you must call .toBlob() which returns promise... so await it:
```ts
import initialsAvatarGen from 'avatar-by-initials';

// .... inside async function

  const avatarBlob = await initialsAvatarGen({
    circleColor: '#ff632e',
    fontColor: '#ffffff',
    fontName: 'Open Sans',
    fontSize: 55,
    nameAndSurname: `John Doe`,
    size: 200,
  })?.toBlob();
```
