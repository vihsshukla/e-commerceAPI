CREATE TYPE user_type AS ENUM ('buyer', 'seller');

create table dbo.users(id serial not null primary key,
					username varchar not null unique,
					password varchar not null,
					usertype user_type not null
);

create table dbo.catalog(id serial not null primary key,
					name varchar null,
				   sellerid bigint not null,
				   name varchar null,
				   CONSTRAINT fk_catalog
				      FOREIGN KEY(sellerid) 
					  REFERENCES users(id)
				);	
ALTER TABLE dbo.catalog ADD CONSTRAINT catalog_unique UNIQUE (sellerid,"name");

			
create table dbo.products(id serial not null primary key,
					name varchar null,
					price numeric(10,2) not null default 0,
					catalogid bigint not null,
					constraint fk_products 
						foreign key(catalogid)
						references catalog(id)
				);
			
create table dbo.orders(id serial not null primary key,
					productid bigint not null,
					buyerid bigint not null,
					constraint fk_orders 
						foreign key(productid)
						references products(id),
					constraint fk_orders_buyer 
						foreign key(buyerid)
						references users(id)
				);
			


