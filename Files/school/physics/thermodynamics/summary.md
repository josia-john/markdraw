# Gas Laws
## Ideal gas
### state variables
* Pressure *p*
* Temperature *T*
* Volume *V*
* Amount of particles *n*

### assumtions
* Particles in gas are pointlike
* They do not react with each other, except for collisions

The density in a gas is usually about 1 kg/m^3

### "Ideal gas like" gases
* Air (N_2, O_2, CO_2)
* Noble Gases (He, Ar, Ne)

## Boyle's law
If *T = constant*
p ∝ 1 / V
=&gt; p_1 * V_1 = p_2 * V_2

## Gay Lussac's law
If *p = constant*
V ∝ T
=&gt; V_1/T_1 = V_2/T_2

[T in Kelvin]

## Amonton's law
If *V = constant*
T ∝ p
=&gt; p_1 / T_1 = p_2 / T_2

## General Gas Equation
p_1 * V_1 / T_1 = p_2 * V_2 / T_2
(constant n)

## Ideal Gas Equation
p * V = n * R * T
p * V = N * k * T

n: [mol]
N: [absolute amount]
R: Gas Constant = 8.3145 J/mol * K
k: Boltzman Constant = 1.381 * 10^-23 J/K

# The microscopic view
## Pressure
p = F/A = 2/3 * N/V * 1/2 * m * v^2
N: [absolute amount]
V:  Volume
m: Mass
v: Velocity

## Kinetic Energy
E_kin = 3/2 * k * T

k: Boltzman Constant = 1.381 * 10^-23 J/K
T: Temperature

## -&gt;
p * V = N * k * T

## Maxwell distribution
Not all particles move with the same speed. If we plot the speeds, we get the Maxwell distribution.

average speed of the particles: avg(v) = sqrt(3kT / m)
k: Boltzman Constant = 1.381 * 10^-23 J/K

The average speed is not the most probable speed though. The relation is the following:
avg(v) = sqrt(6)/2 * prob(v)

# Laws of Thermodynamics
## Internal Energy U
U = 3/2 * k * T * N

## First Law of Thermodynamics
Energy is a conserved quantity. The internal energy U can be changed by heatflow or by doing work.

delta(U) = delta(Q) + delta(W)

Q: heatflow
W: work

## Second Law of Thermodynamics
Heat will flow from warm to cold, not the other way around. This is not reversable. Increase in entropy

# Ideal Engines
## Piston Engine
The piston engine consists of a piston and a closed system. The cycle can be described as follows:

1. Gas expands at constant temperature
2. Gas cools down
3. Gas compresses at constant temperature
4. Gas heats up

The maximal efficiency of this engine is:
1 - (T_1 / T_2)

## Heat pumps
### chiller
The maximal efficiency of this chiller is:
T_1 / (T_2 - T_1)
### heat pump
The maximal efficiency of this heat pump is:
T_2 / (T_2 - T_1)