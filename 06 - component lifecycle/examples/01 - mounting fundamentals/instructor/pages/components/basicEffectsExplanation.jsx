import { useEffect } from 'react';

// fantastic explanation: import { useEffect } from 'react';

export const myComponent = () => {

  useEffect(

    // 1. the logic / callback function that should actually run
    //    -> 'responsible use' of useEffect: interaction w/ external system
    //       (e.g. REST API, chatroom websocket server)
    () => {

      // setup logic
      console.log("i'm firing setup logic (with new/current state and props)")

      return () => {
         console.log("i'm firing cleanup logic (with old state/props)")
         // if the setup logic returns another callback (like here),
         // that's cleanup logic.
         // if the effect re-fires, first it runs cleanup logic
         // w/ old state and props,
         // *THEN* it runs setup log
      }
   },

    // 2. the dependency array
    []
  )

}

/* There are three ways the dependency array can trigger effect firing:
  
  1. no 2nd argument 
     -> effect will re-fire anytime component re-renders
        (don't do this)

  2. [] 
     -> empty dependency array -> effect fires on load,
        and never re-fires

  3. [prop, stateVar]
     -> whenever stuff in the dependency array change value,
        effect will re-fire, *but* these should just be props/state

*/

