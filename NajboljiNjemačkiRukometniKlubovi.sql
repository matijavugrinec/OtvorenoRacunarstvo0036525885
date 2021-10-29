--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2021-10-29 09:25:49

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
-- TOC entry 200 (class 1259 OID 25729)
-- Name: dvorane; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dvorane (
    ime_dvorane character varying NOT NULL,
    kapacitet_dvorane integer NOT NULL
);


ALTER TABLE public.dvorane OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 25787)
-- Name: igraci; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.igraci (
    punoime_igraca character varying NOT NULL,
    naziv_kluba character varying NOT NULL
);


ALTER TABLE public.igraci OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 25737)
-- Name: osnovni_podaci; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.osnovni_podaci (
    naziv_kluba character varying NOT NULL,
    mjesto_sjedista character varying NOT NULL,
    glavni_trener character varying NOT NULL,
    godina_osnutka integer NOT NULL,
    pozicija2021 integer NOT NULL,
    ime_dvorane character varying NOT NULL,
    naziv_lige character varying NOT NULL
);


ALTER TABLE public.osnovni_podaci OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 25798)
-- Name: pomocni_treneri; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pomocni_treneri (
    punoime_pomocnika character varying NOT NULL,
    naziv_kluba character varying NOT NULL
);


ALTER TABLE public.pomocni_treneri OWNER TO postgres;

--
-- TOC entry 3001 (class 0 OID 25729)
-- Dependencies: 200
-- Data for Name: dvorane; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dvorane (ime_dvorane, kapacitet_dvorane) FROM stdin;
ISS DOME	12500
max-Schmeling-Halle	9000
Porsche-Arena	6181
Arena Nürnberger Versicherung	8308
Flens-Arena	6300
EWS Arena	5600
Barclaycard Arena	13000
TUI Arena	9850
Sparkassen-Arena	10285
Arena Leipzig	6327
SAP ARENA	13200
\.


--
-- TOC entry 3003 (class 0 OID 25787)
-- Dependencies: 202
-- Data for Name: igraci; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.igraci (punoime_igraca, naziv_kluba) FROM stdin;
Tomáš Mrkva	Bergischer HC
Jeffrey Boomhouwer	Bergischer HC
Arnór Þór Gunnarsson	Bergischer HC
Tom Kåre Nikolaisen	Bergischer HC
Linus Arnesson	Bergischer HC
Tomáš Babák	Bergischer HC
David Schmidt	Bergischer HC
Dejan Milosavljev	Füchse Berlin
Miloš Vujović	Füchse Berlin
Valter Chrintz	Füchse Berlin
Johan Koch	Füchse Berlin
Lasse Andersson	Füchse Berlin
Jacob Holm	Füchse Berlin
Marko Kopljar	Füchse Berlin
Johannes Bitter	TV Bittenfeld
Patrick Zieker	TV Bittenfeld
Luis Foege	TV Bittenfeld
Samuel Röthlisberger	TV Bittenfeld
Rudolf Faluvégi	TV Bittenfeld
Max Häfner	TV Bittenfeld
Viggó Kristjánsson	TV Bittenfeld
Klemen Ferlin	HC Erlangen
Max Jaeger	HC Erlangen
Johannes Sellin	HC Erlangen
Petter Øverby	HC Erlangen
Steffen Fäth	HC Erlangen
Benedikt Kellner	HC Erlangen
Šime Ivić	HC Erlangen
Benjamin Burić	SG Flensburg-Handewitt
Emil Jakobsen	SG Flensburg-Handewitt
Lasse Svan Hansen	SG Flensburg-Handewitt
Simon Hald	SG Flensburg-Handewitt
Aaron Mensing	SG Flensburg-Handewitt
Jim Gottfridsson	SG Flensburg-Handewitt
Oscar von Oettingen	SG Flensburg-Handewitt
Urh Kastelic	Frisch Auf Göppingen
Marcel Schiller	Frisch Auf Göppingen
Marco Rentschler	Frisch Auf Göppingen
Krešimir Kozina	Frisch Auf Göppingen
Janus Daði Smárason	Frisch Auf Göppingen
Nemanja Zelenović	Frisch Auf Göppingen
Tobias Ellebæk	Frisch Auf Göppingen
Torsten Jansen	HSV Hamburg
Jan Torben Ehlers	HSV Hamburg
Ivan Martinović	TSV Hannover-Burgdorf
Ilija Brozović	TSV Hannover-Burgdorf
Domagoj Duvnjak 	THW Kiel
Nikola Bilyk	THW Kiel
Marko Mamić	SC DHfK Leipzig
Lovro Jotić	SC DHfK Leipzig
Kristjan Horžen	Rhein-Neckar Löwen
Andy Schmid	Rhein-Neckar Löwen
\.


--
-- TOC entry 3002 (class 0 OID 25737)
-- Dependencies: 201
-- Data for Name: osnovni_podaci; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.osnovni_podaci (naziv_kluba, mjesto_sjedista, glavni_trener, godina_osnutka, pozicija2021, ime_dvorane, naziv_lige) FROM stdin;
Füchse Berlin	Berlin	Jaron Siewert	1891	4	max-Schmeling-Halle	Handball-Bundesliga
TV Bittenfeld	Stuttgart	Thomas König	1898	14	Porsche-Arena	Handball-Bundesliga
Bergischer HC	Düsseldorf	Jörg Föste	2006	12	ISS DOME	Handball-Bundesliga
SG Flensburg-Handewitt	Flensburg	Maik Machulla	1990	2	Flens-Arena	Handball-Bundesliga
Frisch Auf Göppingen	Göppingen	Hartmut Mayerhoffer	1896	7	EWS Arena	Handball-Bundesliga
HSV Hamburg	Hamburg	Torsten Jansen	1999	0	Barclaycard Arena	Handball-Bundesliga
TSV Hannover-Burgdorf	Hannover	Antonio Carlos Ortega	1912	11	TUI Arena	Handball-Bundesliga
THW Kiel	Kiel	Filip Jicha	1904	1	Sparkassen-Arena	Handball-Bundesliga
SC DHfK Leipzig	Leipzig	André Haber	1954	6	Arena Leipzig	Handball-Bundesliga
Rhein-Neckar Löwen	Mannheim	Klaus Gärtner	2002	5	SAP ARENA	Handball-Bundesliga
HC Erlangen	Nuremberg	Michael Haaß	2001	13	Arena Nürnberger Versicherung	Handball-Bundesliga
\.


--
-- TOC entry 3004 (class 0 OID 25798)
-- Dependencies: 203
-- Data for Name: pomocni_treneri; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pomocni_treneri (punoime_pomocnika, naziv_kluba) FROM stdin;
Oliver Schuhmacher	Bergischer HC
Maximilian Rinderle	Füchse Berlin
Karsten Schäfer	TV Bittenfeld
Thomas Hankel	HC Erlangen
Zvonimir Serdarušić	SG Flensburg-Handewitt
Rolf Brack	Frisch Auf Göppingen
Markus Groß	HSV Hamburg
 Iker Romero	TSV Hannover-Burgdorf
 Christian Sprenger	THW Kiel
Uwe Jungandreas	SC DHfK Leipzig
Ola Lindgren	Rhein-Neckar Löwen
\.


--
-- TOC entry 2865 (class 2606 OID 25736)
-- Name: dvorane dvorane_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dvorane
    ADD CONSTRAINT dvorane_pkey PRIMARY KEY (ime_dvorane);


--
-- TOC entry 2867 (class 2606 OID 25744)
-- Name: osnovni_podaci osnovni_podaci_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osnovni_podaci
    ADD CONSTRAINT osnovni_podaci_pkey PRIMARY KEY (naziv_kluba);


--
-- TOC entry 2869 (class 2606 OID 25793)
-- Name: igraci igraci_naziv_kluba_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.igraci
    ADD CONSTRAINT igraci_naziv_kluba_fkey FOREIGN KEY (naziv_kluba) REFERENCES public.osnovni_podaci(naziv_kluba);


--
-- TOC entry 2868 (class 2606 OID 25745)
-- Name: osnovni_podaci osnovni_podaci_ime_dvorane_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.osnovni_podaci
    ADD CONSTRAINT osnovni_podaci_ime_dvorane_fkey FOREIGN KEY (ime_dvorane) REFERENCES public.dvorane(ime_dvorane);


--
-- TOC entry 2870 (class 2606 OID 25804)
-- Name: pomocni_treneri pomocni_treneri_naziv_kluba_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pomocni_treneri
    ADD CONSTRAINT pomocni_treneri_naziv_kluba_fkey FOREIGN KEY (naziv_kluba) REFERENCES public.osnovni_podaci(naziv_kluba);


-- Completed on 2021-10-29 09:25:49

--
-- PostgreSQL database dump complete
--

