# 1. Application - screens

The application consists of six screens:
* 01 Welcome screen and presenting player
* 02 Running bugs (presenting enemies)
* 03 Game rules
* 04 How to play
* 05 Start Button
* 06 Game


### 01 Welcome screen 
Short animation sets up: title of the game, player's image and bubble speech. The text in bubble speech presents short story of the Player and his aim in the Game. After clicking NEXT, short animation hides bubble speech and Player with the cookie.

### 02 Running bugs
Short, unexpected animation presents the enemies (bugs).

### 03 Game rules
Short animation sets up again Player with the bubble speech. The Player presents (as text in bubble speech) his enemies and conditions he needs to meet to win the Game.

### 04 How to play
The Player asks for help and explains how the game works (how to move, how to reset the game).

### 05 Start Button
After clicking the button, screens with Game Rules disappear and Game starts.

### 06 Game
The Game with all characters, full heart rating and the key to collect is loaded.


# 2. How the Game works

## Canvas

The game uses Canvas element to show the graphic and its own built in methods to render the pictures and movement. The game starts by rendering all pictures which are mentioned in Resources.

The canvas consist of: active and static elements.

### Static elements
Static pictures such as house, roads, spiderweb don't have their own classes and unique methods. Most of them are repeated elements and then they render from only one picture which is transfer into the new position. In this way game has a structure of tiles.

Static elements have their set up in **engine.js** file in *function render*.

### Active elements
Active elements have their own methods, properties and are updated depending on the events in the game. They all have their origin in class Vector.

Active elements have their set up in **app.js** file and *render* (function renderEntities), *update* (function updateEntities) in **engine.js** file.


# 3. Class Vector - common patterns

In **app.js** file is a class Vector. This class has methods and properties which are common for all active elements and which are used not only once.


## Basic properties

Except setting up constructor for all classes which inherit properties needed to render the picture (png file, position X and Y, width and height of picture), class Vector has methods such as:

* update - checks the position of element and "moves" it
* positionY - sets up element (bugs, key) on one of three tracks
* positionX - sets up element along the lenght of track
* vectorTouch - checks if inheriting classes has the same x and y positions on canvas

Method vectorTouch is used to check if the Player: was bitten by bugs, collected the key, touched Reset Button. If the result of vectorTouch function is positive, the Boolean value associated with the class, changed.


## Results of TouchVector method

The rest of methods are invoked depending on the results of touchVector function.

* tryAgain - is invoked when Bug bites the Player
* collected - is invoked when Player touch the Key
* lostKey - is invoked when Player is bitten by bug 5th time
* newGame - is invoked by lostKey method, when Player touch Reset Button and when the Player win
* win - is invoked when Player collect the Key and then move to position of the Door

All mentioned methods change Boolean values of properties which belong to inheriting classes. 

In this way the values are reset to default or change in values result in rendering or hiding the element.

The functions mentioned in this paragraph move Player or other objects on different position on canvas.

They also show the messages for the user explaining what has happen.


# 4. Class Enemy (Bug)

This class produces multiple unique objects with the use of random generator to set up speed and position.

After using each object, its position is set up to start position, to reuse the object.


# 5. Class Player

Player is the only object in Game controlled by the Game User. User has the ability to move the Player using arrows keys. To prevent Player from moving out of the vanvas the position borders are set. In Player class the function win is invoked after meeting the conditions.


# 6. Class Key

"Get the key" is the condition Player has to meet to win the game. After collecting the key, the door to Witch's house is open and key is hidden form the view.


# 7. Class Message

All the messages for the User are displayed using Bubble Speech which follows the position of the Player. The time of display the message and its duration is set in Class Vector. Because the Bubble Speech is tiny, the text in it is divided into three lines and rendered with the help of the loop. 


# 8. Class Door

Class Door is created to show that the key was collected by the Player. After Player lost the key, reset the game or won the door is closed.


# 9. Class Heart

This class is used to show how many times the user has been bitten by the bug. At start or after resetting the Game, Player has five hearts. When he loses all of them, the Game will be reset.  


# 10. Class Reset

Class Reset is invented to rest the game at any time the User wishes to. Button has the image of the Rock which the Player has to touch.

# 11. Class Cookie

It serves as a decoration when the Player wins the game.

# 12. To win the Game

To win, the Player must collect the key and enter the Witch's house through the open door. When crossing the road, the Player has to watch out for the bugs. After "meeting" with the bug, Player loses one heart. When he loses 5 hearts, the door will be closed and game reset. To move the Player, User uses arrows keys. The Player can move up, down, left, right.
