# react-swiper

# Use

Install
```sh
npm install react-swiper
```

Import

```
import Swiper from 'react-swiper';
```

Implement

```
<Swiper
snapPoint={0.5}
transitionDuration="0.2"
handlerObjects={[]}>
    Insert pages here
</Swiper>
```

# Swiper props

- handlerObjects: a array of objects that control if a swipe is performed.
The handlerObject has 3 values: 
    - id: The index which it belongs to starting at 0, first child id would then be 0 second child 1 etc...
    - leftFunction: The function that controls if the user is allowed to swipe left. Return true to allow, false to deny.
    - rightFunction: The function that controls if the user is allowed to swipe left. Return true to allow, false to deny.
Example structure: [{ id: 0, leftFunction: () => { true }, rightFunction: () => { false }}].
This will allow the user to swipe left on the first page but not right. NOTE: The user cannot swipe out of bound regardless of wether the leftFunction or rightFunction returns true.

- snapPoint: a prop that decides how far the user has to swipe to trigger a swipe. Example 0.5 would be 50% of the width.
- transitionDuration: a props that controls the speed of the css swipe transition in seconds.

# License
MIT