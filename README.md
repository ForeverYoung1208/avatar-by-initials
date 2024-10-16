# What is it

Small utility to make avatar png image from given name and surname.
Tiny. No deps.

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

### shape of the params object: 
```
{
  nameAndSurname: string;
  circleColor: string;
  fontColor: string;
  fontName: string;
  fontSize: number;
  fileName?: string;  // default 'default${timestamp}.png'
  isBold?: boolean;   // default true;
  size?: number;      // default 200;
};
```