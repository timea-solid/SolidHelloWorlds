# Some deployment experiments

Initially, the app was running from my own Pod (NSS at the time) with all data deployed on it, KG, forms and scripts.
It was loading a bit slow both the first and the second page. And the initial KG only has 5 example applications to load.

I thought to implement a feedback I got - put the KG on an CSS instance - maybe it will load faster.
I did this like described in the [readme](https://github.com/timea-solid/SolidHelloWorlds/blob/master/README.md#run-as-a-distributed-system) and it was even worst.

So far, deploying the app on GitHub Pages seems to work fastest. 

The problem was all along that some of my libs, my app depends on, solid-ui.js, in particular was loading slow (3.5M). I added a minified version of it and now the WebApp works fast enough on all deployment flavours. 
