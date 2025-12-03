--
-- PostgreSQL database dump
--

\restrict WXAK3WhAHUFgBqrW02TfDkHesHO5hQbyckyxY9mvp4OazpOPqrxerGMwcHwT3fH

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SELECT pg_catalog.set_config ('search_path', '', false);

SET check_function_bodies = false;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: news; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.news (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    title character varying(500) NOT NULL,
    slug character varying(500) NOT NULL,
    thumnail character varying(255),
    content json,
    category_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.news OWNER TO shilily;

--
-- Name: news_categories; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.news_categories (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    name character varying(255) NOT NULL
);

ALTER TABLE public.news_categories OWNER TO shilily;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.orders (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    customer_name character varying(255) NOT NULL,
    customer_phone character varying(20) NOT NULL,
    service_type_id uuid NOT NULL,
    truck_id uuid,
    weight integer NOT NULL,
    weight_unit character varying(25) NOT NULL,
    from_location character varying(255) NOT NULL,
    to_location character varying(255) NOT NULL,
    duration character varying(50),
    status character varying(25) NOT NULL,
    create_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.orders OWNER TO shilily;

--
-- Name: service_types; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.service_types (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    name character varying(255) NOT NULL,
    create_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.service_types OWNER TO shilily;

--
-- Name: truck_images; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.truck_images (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    truck_id uuid NOT NULL,
    image_url character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.truck_images OWNER TO shilily;

--
-- Name: truck_service_types; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.truck_service_types (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    truck_id uuid NOT NULL,
    service_type_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.truck_service_types OWNER TO shilily;

--
-- Name: truck_truck_types; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.truck_truck_types (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    truck_id uuid,
    truck_type_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.truck_truck_types OWNER TO shilily;

--
-- Name: truck_types; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.truck_types (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.truck_types OWNER TO shilily;

--
-- Name: trucks; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.trucks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    models character varying(255),
    brand character varying(255),
    load integer,
    load_unit character varying(25) NOT NULL,
    description json,
    license_plate character varying(50),
    year integer,
    color character varying(50),
    owner_name character varying(255),
    owner_phone character varying(20),
    documents jsonb,
    status character varying(30) DEFAULT 'active'::character varying,
    registration_expiry date,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.trucks OWNER TO shilily;

--
-- Name: users; Type: TABLE; Schema: public; Owner: shilily
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL,
    username character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    create_at timestamp without time zone DEFAULT now()
);

ALTER TABLE public.users OWNER TO shilily;

--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.news (id, title, slug, thumnail, content, category_id, created_at, updated_at) FROM stdin;
1134069e-cd7c-40dd-af7a-300882109f0e	Giá cước vận chuyển tháng 12 giảm mạnh	gia-cuoc-van-chuyen-thang-12	/images/news1.jpg	{"text": "Do giá nhiên liệu giảm, nhiều hãng vận tải điều chỉnh giảm 10%."}	364d908d-c64d-43f2-b5fc-449b6a80ebe7	2025-11-29 22:16:34.172215	2025-11-29 22:16:34.172215
\.

--
-- Data for Name: news_categories; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.news_categories (id, name) FROM stdin;
364d908d-c64d-43f2-b5fc-449b6a80ebe7	Tin tức vận tải
c0d7c211-90db-4970-af4b-fe202e0d52de	Kinh nghiệm gửi hàng
7177a030-c2d8-40bc-834c-d380b5137dce	Khuyến mãi
\.

--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.orders (id, customer_name, customer_phone, service_type_id, truck_id, weight, weight_unit, from_location, to_location, duration, status, create_at) FROM stdin;
55f736bc-6151-4323-a2cd-3ed4b0a60c0c	Nguyễn Văn A	0901234567	ce09f6d0-83a2-44b0-92ef-10207d00c5ae	6089f631-aa12-4f84-b32a-89937dd910bc	200	kg	Quận 1, TP.HCM	Quận 7, TP.HCM	30 phút	pending	2025-11-29 22:16:34.172215
325745aa-adb4-4de1-a17b-7ec66366c1e0	Trần Thị B	0912345678	070d9c75-aac6-4981-9273-21207f314fca	e0d2c434-0f94-4960-9d6c-da8a81254423	450	kg	Hà Đông, Hà Nội	Hai Bà Trưng, Hà Nội	45 phút	processing	2025-11-29 22:16:34.172215
4883226d-60b3-4d29-8ff8-6315f63be3cc	Công ty ABC	0987654321	ce09f6d0-83a2-44b0-92ef-10207d00c5ae	c47054f8-762a-4207-93b1-78678317e8bc	1500	kg	Biên Hòa	TP.HCM	3 giờ	completed	2025-11-29 22:16:34.172215
36f5822b-8c0c-462c-aa9e-5c2fa476dc11	Phạm Tấn Tài	0961967005	070d9c75-aac6-4981-9273-21207f314fca	c47054f8-762a-4207-93b1-78678317e8bc	58	kg	Công viên phần mềm Quang Trung, 49 Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh	Công ty Cổ Phần Giải pháp Nền tảng số Việt Nam, Đường Số 37, Hiệp Bình Phước, Thủ Đức, Thành phố Hồ Chí Minh	5 tiếng 	pending	2025-11-30 14:52:23.541
\.

--
-- Data for Name: service_types; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.service_types (id, name, create_at) FROM stdin;
ce09f6d0-83a2-44b0-92ef-10207d00c5ae	Nguyên chuyến	2025-11-29 22:16:34.172215
070d9c75-aac6-4981-9273-21207f314fca	Ghép hàng	2025-11-29 22:16:34.172215
\.

--
-- Data for Name: truck_images; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.truck_images (id, truck_id, image_url, created_at) FROM stdin;
\.

--
-- Data for Name: truck_service_types; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.truck_service_types (id, truck_id, service_type_id, created_at) FROM stdin;
\.

--
-- Data for Name: truck_truck_types; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.truck_truck_types (id, truck_id, truck_type_id, created_at) FROM stdin;
\.

--
-- Data for Name: truck_types; Type: TABLE DATA; Schema: public; Owner: shilily
--

COPY public.truck_types (id, name, created_at) FROM stdin; \.

--
-- Data for Name: trucks; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.trucks (id, name, models, brand, load, load_unit, description, license_plate, year, color, owner_name, owner_phone, documents, status, registration_expiry, created_at, updated_at) FROM stdin;
e0d2c434-0f94-4960-9d6c-da8a81254423	Xe tải 1 tấn	Thaco Towner	Thaco	1000	kg	{"usage": "Giao hàng city", "note": "Thùng kín"}	\N	\N	\N	\N	\N	\N	active	\N	2025-12-01 14:17:21.17146	2025-12-01 14:17:21.17146
c47054f8-762a-4207-93b1-78678317e8bc	Xe tải 5 tấn	Isuzu NQR75L	Isuzu	5000	kg	{"usage": "Liên tỉnh", "note": "Chở hàng cồng kềnh"}	\N	\N	\N	\N	\N	\N	active	\N	2025-12-01 14:17:21.17146	2025-12-01 14:17:21.17146
96596f3e-ddf9-4302-a2b8-3d112dd54c61	Xe Tải Nhỏ 1T	Kia Frontier	Kia	1000	kg	{"note": "Xe phù hợp chở hàng nhỏ trong nội thành"}	51C-123.45	2018	Trắng	Nguyễn Quốc Tuấn	0909123456	{"inspection": "uploads/docs/dangkiem.pdf", "registration": "uploads/docs/dangky.pdf"}	active	\N	2025-12-01 14:18:45.71934	2025-12-01 14:18:45.71934
6089f631-aa12-4f84-b32a-89937dd910bc	Xe bán tải	Ranger / Triton / Hilux	Ford	1000	kg	{"usage": "Chở hàng nhẹ", "note": "Thích hợp nội thành"}	51C-123.36	\N	\N	\N	\N	\N	active	\N	2025-12-01 14:17:21.17146	2025-12-01 14:17:21.17146
\.

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: shilily
--


COPY public.users (id, username, password_hash, role, create_at) FROM stdin;
b89eb7b7-24dc-427d-9acc-2acbde07a1fa	admin	hashed_password_123	admin	2025-11-29 22:16:34.172215
71386766-ae22-453c-8c74-2f19163f040e	staff1	hashed_password_456	staff	2025-11-29 22:16:34.172215
\.

--
-- Name: news_categories news_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.news_categories
ADD CONSTRAINT news_categories_pkey PRIMARY KEY (id);

--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.news
ADD CONSTRAINT news_pkey PRIMARY KEY (id);

--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.orders
ADD CONSTRAINT orders_pkey PRIMARY KEY (id);

--
-- Name: service_types service_types_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.service_types
ADD CONSTRAINT service_types_pkey PRIMARY KEY (id);

--
-- Name: truck_images truck_images_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_images
ADD CONSTRAINT truck_images_pkey PRIMARY KEY (id);

--
-- Name: truck_service_types truck_service_types_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_service_types
ADD CONSTRAINT truck_service_types_pkey PRIMARY KEY (id);

--
-- Name: truck_truck_types truck_truck_types_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_truck_types
ADD CONSTRAINT truck_truck_types_pkey PRIMARY KEY (id);

--
-- Name: trucks truck_types_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.trucks
ADD CONSTRAINT truck_types_pkey PRIMARY KEY (id);

--
-- Name: truck_types truck_types_pkey1; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_types
ADD CONSTRAINT truck_types_pkey1 PRIMARY KEY (id);

--
-- Name: truck_truck_types unique_truck_type; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_truck_types
ADD CONSTRAINT unique_truck_type UNIQUE (truck_id, truck_type_id);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.users
ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- Name: news fk_news_category; Type: FK CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.news
ADD CONSTRAINT fk_news_category FOREIGN KEY (category_id) REFERENCES public.news_categories (id);

--
-- Name: orders fk_orders_service_type; Type: FK CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.orders
ADD CONSTRAINT fk_orders_service_type FOREIGN KEY (service_type_id) REFERENCES public.service_types (id);

--
-- Name: orders fk_orders_truck_type; Type: FK CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.orders
ADD CONSTRAINT fk_orders_truck_type FOREIGN KEY (truck_id) REFERENCES public.trucks (id);

--
-- Name: truck_truck_types fk_truck; Type: FK CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_truck_types
ADD CONSTRAINT fk_truck FOREIGN KEY (truck_id) REFERENCES public.trucks (id) ON DELETE SET NULL;

--
-- Name: truck_truck_types fk_truck_type; Type: FK CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_truck_types
ADD CONSTRAINT fk_truck_type FOREIGN KEY (truck_type_id) REFERENCES public.truck_types (id) ON DELETE RESTRICT;

--
-- Name: truck_service_types fk_tst_service; Type: FK CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_service_types
ADD CONSTRAINT fk_tst_service FOREIGN KEY (service_type_id) REFERENCES public.service_types (id) ON DELETE CASCADE;

--
-- Name: truck_service_types fk_tst_truck; Type: FK CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_service_types
ADD CONSTRAINT fk_tst_truck FOREIGN KEY (truck_id) REFERENCES public.trucks (id) ON DELETE CASCADE;

--
-- Name: truck_images truck_images_truck_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shilily
--

ALTER TABLE ONLY public.truck_images
ADD CONSTRAINT truck_images_truck_id_fkey FOREIGN KEY (truck_id) REFERENCES public.trucks (id) ON DELETE CASCADE;

--
-- PostgreSQL database dump complete
--

\unrestrict WXAK3WhAHUFgBqrW02TfDkHesHO5hQbyckyxY9mvp4OazpOPqrxerGMwcHwT3fH