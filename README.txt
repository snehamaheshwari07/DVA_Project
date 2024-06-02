DESCRIPTION

Our project is divided into 4 modules: web, crime, food, and traffic.

The web module is the main module that uses the data from other three modules to provide the web interface. In this repository, we already included the processed data, so you can run the web module directly.

The other three modules are responsible for processing the data.  More specifically, the crime module is responsible for crime heatmap generation. The food module is responsible for restaurants data. The traffic module is responsible for traffic data.


INSTALLATION

For the web module:

1. Install Node.js and npm
2. Inside the web folder, run `npm install`

For the crime, food, and traffic modules:

1. Install Python 3.10.6
2. cd into the crime, food, and traffic folders, and create a virtual environment by running `python3 -m venv env`
3. Activate the virtual environment by running `source env/bin/activate`
4. Install the required packages by running `pip install -r requirements.txt`


DATA

For the crime data:

1. Download the data from https://data.cityofnewyork.us/Public-Safety/NYC-crime/qb7u-rbmr, name it crimedata.csv, and place it in the crime folder

For the food data:

1. Download the data from https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j, name it foodRaw.csv, and place it in the food folder

For the traffic data:

1. Download the data from https://www.kaggle.com/competitions/nyc-taxi-trip-duration/data, name it data.csv, and place it in the traffic folder


EXECUTION

For the web module:

1. Inside the web folder, run `npm start`, the web interface will be available at http://localhost:1234

For the crime, food, and traffic modules:

1. Open the analysis.ipynb file in each module folder, and run the cells in order

