# 🎵 Tonegraph 🎵

# Background 
Largely inspired by Rob Stenson's visualization of Vulfpeck's '*Bach Vision Test*', Tonegraph was built on the idea of visualizing JS Bach's counterpoint to add a further layer of complexity when appreciating his works. Eventually the projects goal will be to apply a method of visualizing the data of sheet music in general. 

# Technology

- **React** - A reliable front-end library for quickly putting together a UI
- **Flat Embed / REST API** - Flat's Embed allows the user to view and play the sheet music on the browser. It's API allows us to parse data from a MusicXML file.
- **ChartJS** - No-fuss charting library run on HTML5 Canvas

# ⚙️How It Works 
## Deriving frequencies from Music Theory 🎼

The first hurdle for this project was to find a way to derive frequencies from theory, there is after all no actual sound waves coming from just a simple sheet of music. Forunately the formula for the frequency of notes is already out there:

> ### *fn = f0 * (a)n*

- **f0** = the frequency of one fixed note which must be defined, generally okay to define the A above middle C (A4) at f0 = 440Hz
- **n** = the number of half steps away from the fixed note you are. If you are at a higher note, n is positive. If you are on a lower note, n is negative.
- **fn** = the frequency of the note n half steps away.
- **a** = (2)1/12 = the twelth root of 2 

This formula is used to derive frequencies for an equal-tempered scale (it's own topic really) but will work just fine for our purposes.

The biggest difficulty in this formula was the variable **n**, the number of half-steps away from the fixed note you are. Since the half-step total can be positive or negative that means you need to create an algorithm that can understand a few things:

1. Letter notes (based in Western Theory)
2. The positioning of letter notes in relation to each other to determine whether or not to go positive or negative
3. How accidentals (♯,♭) and octaves can affect relative half-step distance and theoretically can be written infinitely

## Notation

Music notation and the staffs they're built upon are the foundations of modern Western Music Theory. Unfortunately these building blocks aren't exactly inherent to computers. It's a complicated topic and completely out of the scope of this project. Luckily there's already a group of very talented engineers working on a standardization for this problem, MusicXML.

### *MusicXML* 💿

As described by the site:

> MusicXML was designed from the ground up for sharing sheet music files between applications, and for archiving sheet music files for use in the future. You can count on MusicXML files being readable and usable by a wide range of music notation applications, now and in the future. 

Robust and reliable, MusicXML is the gold standard for music notation software. As an added bonus it got licensed under W3C back in version 3.1 and it's documentation in turn became fairly accessable on the web. In order to get this MusicXML data as something a little easier to use (JSON) we use **Flat's REST API**. 

## Charting Data 💹

There were two stand out options for visualizing data for this project: **D3** and **ChartJS**.

**D3**
- SVG based
- Wide range of capabilities
- Steep learning curve

**ChartJS**
- Canvas based
- Limited visualization options
- Simple and straightforward API

Since the current scope of the project only really required a Stepped-Line graph I opted to use **ChartJS**. It's easy to use API allowed me to get off the ground running and it's use of the Canvas over SVG will speed up performance for the large volume of data that can come with music scores. In exchange for it's performance however the Canvas does have it's drawbacks. It's render size can **not** be expressed with relative values, but it's *display* size can. These sizes are independent from each other so the canvas render size does not adjust automatically based on the display size, making the rendering inaccurate. This can become very tricky to handle when you're dealing with a large volume of responsive data, but there are a few built-in options that might help you manage this.

## Time ⏳

Time doesn't exist in sheet music, so you're gonna need to work out your own way to collate data from MusicXML and turn it into something that can the illusion of time relative to the piece. There are a lot of factors that go into the length of a piece, including human input variation, so you can never really come up with a true time length for a piece but you can come pretty close to an approximate length. 

Originally I was using rather niche methods to manipulate the Date object in order to create a record of probable time spent. I had to keep track of the BPM of the piece and use it to divide any note length into the approximate amount of seconds they use and then add that value into an instance of the Date object. Then I had to keep separate Date objects in order to account for the different Parts which in turn had their own different voices. Then I needed to turn these Date objects into something more readable so I had to use *Luxon* as an adapter for a more appropriate time format. Things quickly got out of hand as the complexity of the project grew so I decided to phase out the Date object altogether. 

In it's place I opted for an incremental method where I assigned notes to values that were relative to each other. 

- *ie:* if a quarter-note had a value of 1 then a half-note would have a value of 2 and so on

# Future Goals and Current Constraints 🥅

Eventually there are some major improvements that I'd like to implement but they will be rather time consuming:

- **FlatJS:** Right now I'm not entirely comfortable having users upload their own MusicXML, so it's currently running on the original premise of visualizing Bach's works but once all the kinks are out that will definitely be the first major update. 
- **ChartJS:** ChartJS is effective but ultimately limiting. Perfectly fine for the current iteration of the project but if I want to expand the features I will probably make the switch to **D3**.
- **MusicXML:** Working with MusicXML has revealed to me that there is a need to adapt MusicXML data into some kind of schema or REST API that will be better suited for data driven software. It should be simple and easy to understand, and have data summation that is not abstracted or nested from the developer. This will definitely be it's own project but it's good to acknowledge it's existence. 

There are some issues that need to be resolved:

- **Percussion:** Percussion can have it's own system of notation that can be both pitched and unpitched. This means that quickly differentiating a percussion line from a non-percussion line in MusicXML can be difficult.
- **Repeat:**  A repeat sign has a lot of different ways it can be handled so factoring them into a graph like this may lead to the time perception being somewhat innaccurate.
- **Niche:** There are tons of niche symbols and methods that can be applied in music theory each of them will have to be handled individually in order to be implemented. 