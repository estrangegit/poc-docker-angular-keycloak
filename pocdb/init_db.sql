create tablespace ts_data_poc owner pocdb location '/database/EXAMPLE/TS_DATA_POC';
create tablespace ts_indx_poc owner pocdb location '/database/EXAMPLE/TS_INDX_POC';

create schema if not exists poc authorization pocdb;
