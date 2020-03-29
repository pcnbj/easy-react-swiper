import React, { useEffect } from "react";
import "./index.css";

const Swiper = props => {

  let itemWidth;
  let itemMarginRight;

  //It's a debounce function...
  const debounce = (fn, delay) => {
    let timeoutID;
    return function(...args) {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  useEffect(() => {
    //Define swipe functions
    const swipeLeft = (item, transform) => {
        item.style.transform = `translateX(${transform +
          Math.abs(itemWidth + itemMarginRight)}px)`;
      };
    
      const swipeRight = (item, transform) => {
        item.style.transform = `translateX(${-Math.abs(
          -Math.abs(itemWidth + itemMarginRight) + transform
        )}px)`;
      };

    //When mounted define variables and references to the dom
    let initialPosition = null;
    let moving = false;
    let transform = 0;
    let index = 0;
    itemWidth = parseInt(window.getComputedStyle(document.querySelector(".swipe-track > *:first-child")).getPropertyValue("width").replace("px", ""));
    itemMarginRight = parseInt(window.getComputedStyle(document.querySelector(".swipe-track > *:first-child")).getPropertyValue("margin-right").replace("px", ""));
    const swipeContainer = document.querySelector(".swipe-container");
    const swipeTrack = document.querySelector(".swipe-track");

    const swipeStart = e => {
      //Set inital position, moving and transform
      initialPosition = e.pageX;
      moving = true;
      const transformMatrix = window
        .getComputedStyle(swipeTrack)
        .getPropertyValue("transform");
      if (transformMatrix !== "none") {
        transform = parseInt(transformMatrix.split(",")[4].trim());
      }
    };

    const swipeMove = e => {
      //If moving
      if (moving) {
        //Set current position and difference
        const currentPosition = e.pageX;
        const diff = currentPosition - initialPosition;
        //If diff is a positive number aka a left swipe
        if (Math.sign(diff) === 1) {
          //Run child handlers
          if(props.handlerObjects.length > 0) {
          props.handlerObjects.forEach(handler => {
            if (handler.leftFunction && index === handler.id) {
              if (handler.leftFunction() === true) {
                //Check if swipe position is past the snap point
                if (currentPosition / itemWidth >= props.snapPoint) {
                  //Check if out of bounds to the left
                  if (transform + itemMarginRight + 5 > 0) {
                    //Reset back to first item
                    swipeTrack.style.transform = `translateX(${0})`;
                  } else {
                    //Slide back 1
                    swipeLeft(swipeTrack, transform);
                    moving = false;
                    index--;
                  }
                }
              }
            } else {
              //Check if swipe position is past the snap point
              if (currentPosition / itemWidth >= props.snapPoint) {
                //Check if out of bounds to the left
                if (transform + itemMarginRight + 5 > 0) {
                  //Reset back to first item
                  swipeTrack.style.transform = `translateX(${0})`;
                } else {
                  //Slide back 1
                  swipeLeft(swipeTrack, transform);
                  moving = false;
                  index--;
                }
              }
            }
          });
        } else {
          //Check if swipe position is past the snap point
          if (currentPosition / itemWidth >= props.snapPoint) {
            //Check if out of bounds to the left
            if (transform + itemMarginRight + 5 > 0) {
              //Reset back to first item
              swipeTrack.style.transform = `translateX(${0})`;
            } else {
              //Slide back 1
              swipeLeft(swipeTrack, transform);
              moving = false;
              index--;
            }
          }
        }
        }
        //if diff is a negative number
        else if (Math.sign(diff) === -1) {
          //Run child handlers
          if(props.handlerObjects.length > 0) {
          props.handlerObjects.forEach(handler => {
            //If the handler has a rightFunction and it's id is equal to the current index
            if (handler.rightFunction && index === handler.id) {
              //If the handler function returns true swipe
              if (handler.rightFunction() === true) {
                //Check if out of bounds to the left
                if (
                  Math.abs(
                    transform - itemMarginRight - 5 - itemWidth
                  ) >=
                  parseInt(
                    window
                      .getComputedStyle(swipeTrack)
                      .getPropertyValue("width")
                      .replace("px", "")
                  )
                ) {
                  //Reset to the last item
                  swipeTrack.style.transform = `translateX(${-Math.abs(
                    parseInt(
                      window
                        .getComputedStyle(swipeTrack)
                        .getPropertyValue("width")
                        .replace("px", "")
                    ) -
                      itemWidth -
                      itemMarginRight
                  )}px)`;
                } else {
                  if (currentPosition / itemWidth <= props.snapPoint) {
                    //Increment index and start transition
                    moving = false;
                    index++;
                    swipeRight(swipeTrack, transform);
                  }
                }
              }
            }
            //If no handler function
            else {
              if (
                Math.abs(
                  transform - itemMarginRight - 5 - itemWidth
                ) >=
                parseInt(
                  window
                    .getComputedStyle(swipeTrack)
                    .getPropertyValue("width")
                    .replace("px", "")
                )
              ) {
                swipeTrack.style.transform = `translateX(${-Math.abs(
                  parseInt(
                    window
                      .getComputedStyle(swipeTrack)
                      .getPropertyValue("width")
                      .replace("px", "")
                  ) -
                    itemWidth -
                    itemMarginRight
                )}px)`;
              } else {
                if (currentPosition / itemWidth <= props.snapPoint) {
                  moving = false;
                  index++;
                  swipeRight(swipeTrack, transform);
                }
              }
            }
          });
        } else {
          //No handlers
          if (
            Math.abs(
              transform - itemMarginRight - 5 - itemWidth
            ) >=
            parseInt(
              window
                .getComputedStyle(swipeTrack)
                .getPropertyValue("width")
                .replace("px", "")
            )
          ) {
            swipeTrack.style.transform = `translateX(${-Math.abs(
              parseInt(
                window
                  .getComputedStyle(swipeTrack)
                  .getPropertyValue("width")
                  .replace("px", "")
              ) -
                itemWidth -
                itemMarginRight
            )}px)`;
          } else {
            if (currentPosition / itemWidth <= props.snapPoint) {
              moving = false;
              index++;
              swipeRight(swipeTrack, transform);
            }
          }
        }
      }
      }
    };

    const swipeStop = e => {
      moving = false;
    };

    if (window.PointerEvent) {
      swipeContainer.addEventListener(
        "pointerdown",
        debounce(e => {
          swipeStart(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );

      swipeContainer.addEventListener(
        "pointermove",
        debounce(e => {
          swipeMove(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );

      swipeContainer.addEventListener(
        "pointerup",
        debounce(e => {
          swipeStop(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );
    } else {
      swipeContainer.addEventListener(
        "touchdown",
        debounce(e => {
          swipeStart(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );

      swipeContainer.addEventListener(
        "touchmove",
        debounce(e => {
          swipeMove(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );

      swipeContainer.addEventListener(
        "touchup",
        debounce(e => {
          swipeStop(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );

      swipeContainer.addEventListener(
        "mousedown",
        debounce(e => {
          swipeStart(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );

      swipeContainer.addEventListener(
        "mousemove",
        debounce(e => {
          swipeMove(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );

      swipeContainer.addEventListener(
        "mouseup",
        debounce(e => {
          swipeStop(e);
        }, parseFloat(props.transitionDuration) * 1000 + 10)
      );
    }
  }, [
    props.snapPoint,
    props.handlerObjects,
    props.transitionDuration
  ]);

  return (
    <div className="swipe-container">
      <div
        style={{
          transition: `transform ${props.transitionDuration}s ease-in-out`
        }}
        className="swipe-track"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Swiper;
