#!/usr/bin/env python
# coding: utf-8

# # Part 1
# ---
# 

# In[1]:


# Part 1 objective is to go through all the values of the input data and sum them together

# Fetch the input data from file into a variable
input = open("input.txt").read()
# Split the input line-by-line into an array
input = input.split()
# Define a variable to use for the solution. The instructions were to start it at 0
freq = 0

# Loop through all the values in the input array
for val in input:
    # Convert the value from string to a number (integer)
    val = int(val)
    # Then add it to our solution variable
    freq += val

# Print our result
print("Solution for part 1 is:", freq)


# In[2]:


# Of course you could condense this down a lot with fancier syntax and skipping comments
# For example, following single line does all same operations as the previous code combined

print("The solution is still:", sum(map(int, open("input.txt").readlines())))


# # Part 2
# ---

# In[17]:


# Part 2 objective is to find which frequency is visited twice during the operations

# We can use most of what we already did in part 1. In fact, the variables such as 'input'
# are still accessible for us in this notebook cell. So lets only write what needs to be
# overwritten or added

# Overwrite the frequency to start from the initial value
freq = 0
# Define a dictionary to keep track of each frequency as we go through them
frequencies = {0}
# Define a variable to store our solution if we find it
sol = 0

# Run through all operations again, but track the results until we hit the same frequency
# for the second time. The caveat here is that this might not happen with a single loop
# So we must keep looping until it does. Let's try 3,000 times and hope that is enough.

for _ in range(3000):
    # Loop through all values
    for val in input:
        # Add the value to the frequency
        freq += int(val)
        # If we have been at this frequency before, store it and stop the loop
        if freq in frequencies:
            sol = freq
            break
        # Otherwise store this frequency
        frequencies.add(freq)
    # If a solution had been found, no need to finish all 3,000 loops. Let's stop
    if sol > 0:
        break

# Print our result
print("Solution for part 2 is:", sol)


# In[21]:


# Again, this can be achieved with much fewer lines of code. For example the approach below
# This uses a common import module for iterator functions such as 'accumulate' and 'cycle'

opers = [int(n.strip()) for n in open("input.txt").read().split() if n.strip()]
from itertools import accumulate, cycle
freqs = set()
print("Solution:", next(f for f in accumulate(cycle(opers)) if f in freqs or freqs.add(f)))

