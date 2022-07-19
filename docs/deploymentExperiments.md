# Some deployment experiments

Initially, the app was running from my own Pod (NSS at the time) with all data deployed on it, KG, forms and scripts.
It was loading a bit slow both the first and the second page. And the initial KG only has 5 example applications to load.

I thought to implement a feedback I got - put the KG on an CSS instance - maybe it will load faster.
I did this like described in the [readme](https://github.com/timea-solid/SolidHelloWorlds/blob/master/README.md#run-as-a-distributed-system) and it was even worst.

So far, deploying the app on GitHub Pages seems to work fastest. 

My conclusion is that Pods are not best used as hosting platforms for web apps. And tha the loading of a KG or forms from a Pod is also not the best and fastest. 
