# Topographical Sky
This project maps the chronological carbon footprint of European countries over the last decade (2014–2023). By cross-referencing these emissions with passenger volumes and airport infrastructure.

The final visualization relies exclusively on Eurostat data spanning from 2014 to 2023, utilizing the following specific datasets:
•	[env_air_gge]:Greenhouse gases (CO2, N2O equivalent) by source sector. (Specifically filtering for 1A3A - Domestic aviation and 1D1A - International aviation to avoid aggregation errors).
•	[estat_ttr00012]: Total annual commercial passenger traffic.
•	[avia_if_arp]: Number of commercial airports per country (filtered for main airports).

