# TetoStats
A TETR.IO statistics website.

# Statistics 101
## Basic statistics

### Pieces per second (PPS)
PPS is the statistic that measures the speed of a given player. This is calculated by dividing the number of pieces placed by the time spent in the game, in seconds.

![PPS equation](https://imgur.com/LeIy1Ly.png) 

Where ``pieces`` is the total number of Tetriminoes the player has placed, and ``t`` is the time in seconds.

### Attack per minute (APM)
APM represents the frequency of damage a player sends. This is calculated by dividing the number of lines sent (received or cancelled by the opponent) by the total time spent in the game.

![APM equation](https://i.imgur.com/jxbos9O.png)

Where ``attack`` is the number of lines sent (received or cancelled by the opponent) ``t`` is the time in seconds.

### VS Score (VS)
VS score is a metric created for TETR.IO, made in order to approximate one's "skill score" in a Tetra League game. This is how it is measured:

![VS equation](https://imgur.com/nlANRsP.png)

Where ``attack`` is the number of lines sent, ``ds`` is the number of garbage lines cleared, ``t`` is the time in seconds.

### Attack per Piece (APP)
APP has been made to measure the efficiency of a player, which means the maximum amount of garbage sent with the least pieces as possible.

![APP equation](https://imgur.com/cdeCqn6.png)

### Downstack per Second (DSPS)
DSPS is the amount of garbage one clears in a second, as straight-forward as it sounds. You can get its value by either having the time and downstack, or you can deduce it from the VS and APM.

![DSPS equation](https://imgur.com/M9VZLOG.png)

### Downstack per Piece (DSPP)
DSPP is basically the efficiency of garbage. We can see that as the quality of Downstack, whereas [DSPS](#downstack-per-second-dsps) is the amount of downstack. You could theoretically estimate quite well one's Downstack ability using these two values.

![DSPP equation](https://imgur.com/iYy7TQQ.png)

Where ``p`` is the total number of pieces placed.

## Advanced stats
### Cheese Index (CI)
CI estimates the shape of garbage a player sends. When it has a low value, then the garbage of the player will be cleaner, otherwise it'll be cheesier. Its equation uses multiple Basic stats.

![CI equation](https://imgur.com/Pn96yS9.png)

### Garbage Efficiency (GE)
⚠ **Warning: not to be mistaken with [DSPP](#downstack-per-piece-dspp)** <br>
GE measures how well a player uses its garbage to backfire. If the value is low, then the player replies with cheesy garbage, otherwise it'll send cleaner garbage.

![GE equation](https://imgur.com/U9dOSEJ.png)

### Win Chance (WC)
Win chance is as straight-forward as it sounds, although it is in this section because of how it is calculated. It is based on the ``glicko ± rd`` system. The value is in percents, for the first player (player 1 on the equation)

![WC equation](https://imgur.com/rdDzked.png)

Where ``R1 ; R2`` are the users glicko, and ``rd1 ; rd2`` are the players RD. Result will be for the player 1.