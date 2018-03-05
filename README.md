# neuro-box
Link your attention level to 3D boxes

### requirements
MacOS | Python3 | Mindwave Mobile Headset

### install dependencies
```yarn```

### connect your mindwave mobile to your computer via bluetooth

### run app
open 2 terminals into the root of the app

in terminal 1, serve the static files to localhost:8000 :
```python -m http.server```

in terminal 2 run the app:
```node brain-to-boxes.js```

open a browser window to localhost:8000

### debugging
Lots of logging is going on in the browser console, so feel free to explore with the developer tools.
The ability to select and drag boxes in the 3D environment will break after a couple minutes requiring a page refresh.
