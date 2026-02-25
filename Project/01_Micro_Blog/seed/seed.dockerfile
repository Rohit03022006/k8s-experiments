FROM mysql:8.0

# Setting allowed empty password just for local initialization convenience if NOT dynamically passed.
# In prod this is overwritten by env vars from secrets
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
ENV MYSQL_DATABASE=microdb

# MySQL initdb directory executes SQL scripts during startup
COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Non-root compliance (default image usually runs mysql as mysql user)
USER mysql

EXPOSE 3306
