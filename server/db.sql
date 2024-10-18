--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    user_id integer NOT NULL,
    game_id integer NOT NULL,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favorites OWNER TO juliana;

--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.favorites_favorite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_favorite_id_seq OWNER TO juliana;

--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    user_id integer NOT NULL,
    game_id integer NOT NULL,
    rating integer,
    review_text text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO juliana;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_review_id_seq OWNER TO juliana;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: juliana
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    name character varying(100),
    city character varying(100)
);


ALTER TABLE public.users OWNER TO juliana;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: juliana
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO juliana;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: juliana
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: favorites favorite_id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.favorites (favorite_id, user_id, game_id, added_at) FROM stdin;
5	3	5286	2024-10-14 12:50:57.4867
4	2	13536	2024-10-14 12:50:50.082405
3	2	12020	2024-10-14 12:50:50.082405
2	1	4286	2024-10-14 12:50:17.78165
1	1	32	2024-10-14 12:50:17.78165
7	4	4200	2024-10-14 15:46:45.185429
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.reviews (review_id, user_id, game_id, rating, review_text, created_at) FROM stdin;
1	1	3498	5	A classic game that I never get tired of playing.	2024-10-14 12:51:20.931026
2	2	3328	4	Amazing world-building, but a few too many bugs.	2024-10-14 12:51:20.931026
3	3	5679	3	It has potential, but it didn’t meet my expectations.	2024-10-14 12:51:20.931026
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: juliana
--

COPY public.users (user_id, username, email, password, created_at, name, city) FROM stdin;
1	michael.scott	michael@dundermifflin.com	password123	2024-10-14 12:49:32.545735	Michael Scott	Scranton
2	jim.halpert	jim@dundermifflin.com	password123	2024-10-14 12:49:32.545735	Jim Halpert	Scranton
3	pam.beesly	pam@dundermifflin.com	password123	2024-10-14 12:49:32.545735	Pam Beesly	Scranton
4	beetsrule	dwight@test.com	dwight123	2024-10-14 15:05:45.705073	Dwight Schrute	Scranton
6	testing	test@test.com	password	2024-10-17 18:49:15.055365	test name	city
\.


--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 8, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 6, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: juliana
--

SELECT pg_catalog.setval('public.users_user_id_seq', 6, true);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: juliana
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

