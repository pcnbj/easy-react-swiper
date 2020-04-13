# easy-react-swiper

# Use

Install
```sh
npm install easy-react-swiper
```

Import

```
import Swiper from 'easy-react-swiper';
```

Implement

```
<Swiper
snapPoint={20}
transitionDuration="0.2"
handlerObjects={[]}>
    Insert pages here
</Swiper>
```

Note: you can only have 1 swiper per page as it uses querySelector to get the element by class.

# Swiper props

- handlerObjects: an array of objects that control if a swipe is performed.
The handlerObject has 3 values: 
    - id: The index which it belongs to starting at 0, first child id would then be 0-second child 1, etc...
    - leftFunction: The function that controls if the user is allowed to swipe left. Return true to allow, false to deny.
    - rightFunction: The function that controls if the user is allowed to swipe left. Return true to allow, false to deny.
Example structure:
```
[{ id: 0, leftFunction: () => { true }, rightFunction: () => { false }}]
```
This will allow the user to swipe left on the first page but not right. NOTE: The user cannot swipe out of bound regardless of whether the leftFunction or rightFunction returns true.

- snapPoint: a prop that decides how far the user has to swipe to trigger a swipe in pixels. Example 20 will swipe if the swipe length is greater or equal to 20px.
- transitionDuration: a prop that controls the speed of the CSS swipe transition in seconds.

# Functions

- forceSwipe: a function that allows you to force a swipe.
Example use:
```
import { forceSwipe } from 'easy-react-swiper';

handleClick = () => {
   forceSwipe('right');
}
```
Note: it won't swipe if out of bounds.

# License
MIT