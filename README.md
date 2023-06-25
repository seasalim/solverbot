# SOLVERBOT #

This is an experimental GPT-based agent that automously explores a maze to find the exit.

Roughly inspired by https://voyager.minedojo.org

It uses the recently debuted OpenAI functions capability (https://openai.com/blog/function-calling-and-other-api-updates)

The maze finding is all done via text descriptions.

A simple web GUI displays the current state of the maze, position of the AI player, and the exit.

The AI agent provides entertaining commentary (and occasionally some life philosophy) as it searches.

Typical conversation:

```
AGENT: maze_generate {'size': '7'}
RESPONSE: {"message": {"coordinates": {"x": 5, "y": 3}, "description": "There is a passageway to the south. There is a
passageway to the north. "}}

AGENT: maze_move {'direction': 'south', 'commentary': 'Here we go, venturing into the unknown!'}
RESPONSE: {"message": {"coordinates": {"x": 5, "y": 4}, "description": "There is a passageway to the south. There is a
passageway to the north. "}}

AGENT: maze_move {'direction': 'south', 'commentary': 'Down we go, deeper into the maze!'}
RESPONSE : {"message": {"coordinates": {"x": 5, "y": 5}, "description": "There is a passageway to the west. There is a
passageway to the north. "}}

AGENT: maze_move {'direction': 'west', 'commentary': "Turning left, let's see where this takes us!"}
RESPONSE: {"message": {"coordinates": {"x": 4, "y": 5}, "description": "There is a passageway to the east. There is a
passageway to the west. "}}

AGENT: maze_move {'direction': 'west', 'commentary': "Heading west, hope we're not getting lost!"}
RESPONSE: {"message": {"coordinates": {"x": 3, "y": 5}, "description": "There is a passageway to the east. There is a
passageway to the west. There is a exit to the north. "}}

AGENT: maze_move {'direction': 'north'}
RESPONSE: {"message": {"coordinates": {"x": 3, "y": 4}, "description": "You are at the exit! No more moves allowed."}}

AGENT: {
  "role": "assistant",
  "content": "Congratulations! We've made it to the exit! No more moves allowed from here.\n\nWell, what an exhilarating
journey it has been. We braved the unknown, navigated the twists and turns, and ultimately triumphed over the labyrinth.
I hope you enjoyed the adventure as much as I did.\n\nRemember, mazes are not just physical puzzles, but they can also
be metaphors for life. They teach us valuable lessons about perseverance, decision-making, and the importance of
embracing challenges. So, the next time you find yourself facing a maze in life, remember this experience and approach
it with the same determination and curiosity.\n\nThank you for joining me on this maze escape quest. Until our paths
cross again, keep exploring, keep discovering, and keep finding your way forward!"
}
```

Another sample conversation:
```
AGENT: maze_generate {'size': '7'}
RESPONSE: {"message": {"coordinates": {"x": 3, "y": 1}, "description": "There is a exit to the east. There is a
passageway to the west. "}}

AGENT: maze_move {'direction': 'east', 'commentary': "Let's start our journey by moving east!"}
RESPONSE: {"message": {"coordinates": {"x": 4, "y": 1}, "description": "You are at the exit! No more moves allowed."}}

AGENT: {
  "role": "assistant",
  "content": "Hooray! We made it! We found the exit just with one move to the east! That was quick and easy. Well, I
guess sometimes in mazes luck is on your side. Thank you for joining me on this short adventure!"
}
```

GUI demo:

![Teaser](/img/teaser.gif)


# INSTALLATION

There are two main components:

1. `server.js` - A node.js REST API that hosts the maze server and web GUI
2. `solver.py` - The Python agent script

To install:

1. Clone this repo
2. Install node
3. Install node dependencies (currently, express and body-parser)
4. Install Python 3.xx
5. Install the Python dependencies (see requirements.txt)

# CONFIGURATION

Set the OpenAI API key in the `OPENAI_API_KEY` environment variable

Configuration that can be changed in the `solver.py` script:

1. Model to use. By default, the agent uses the `gpt-3.5-turbo-0613` model.
2. Starting maze size. By default, it is set to `7`.
3. How long to wait before issuing command to OpenAI endpoint in autorun mode. Default value is `2` seconds.
4. Debugging level. Default is `ERROR`.

# RUNNING

1. Run server locally (`node server.js`)
2. Run agent (`python solver.js`) [Use `--autorun` flag to bypass confirmation prompts]
3. Open web page at http://localhost:3000

# AUTHOR(S)

Salim Alam

# LICENSE

Source code is released under the Apache 2.0 license as follows:

Copyright 2023 Salim Alam

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.



[img/teaser.mp4]: /img/teaser.mp4