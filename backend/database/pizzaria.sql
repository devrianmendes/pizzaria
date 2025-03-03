PGDMP  :    %                 }            pizzaria    16.4    16.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    40960    pizzaria    DATABASE        CREATE DATABASE pizzaria WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE pizzaria;
                postgres    false            �            1259    40963    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �            1259    41028 
   categories    TABLE     �   CREATE TABLE public.categories (
    id text NOT NULL,
    name character varying(20) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    41057    items    TABLE     !  CREATE TABLE public.items (
    id text NOT NULL,
    amount integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "orderId" text NOT NULL,
    "productId" text NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    41046    orders    TABLE     J  CREATE TABLE public.orders (
    id text NOT NULL,
    "table" integer NOT NULL,
    status boolean DEFAULT false NOT NULL,
    draft boolean DEFAULT true NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    41037    products    TABLE     f  CREATE TABLE public.products (
    id text NOT NULL,
    name character varying(20) NOT NULL,
    price text NOT NULL,
    description text NOT NULL,
    banner text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "categoryId" text NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    40974    users    TABLE     K  CREATE TABLE public.users (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false                      0    40963    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �!                 0    41028 
   categories 
   TABLE DATA           H   COPY public.categories (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   J#                 0    41057    items 
   TABLE DATA           ]   COPY public.items (id, amount, "createdAt", "updatedAt", "orderId", "productId") FROM stdin;
    public          postgres    false    220   �#                 0    41046    orders 
   TABLE DATA           \   COPY public.orders (id, "table", status, draft, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   U$                 0    41037    products 
   TABLE DATA           p   COPY public.products (id, name, price, description, banner, "createdAt", "updatedAt", "categoryId") FROM stdin;
    public          postgres    false    218   �$                 0    40974    users 
   TABLE DATA           T   COPY public.users (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   '       r           2606    40971 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            w           2606    41036    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    217            }           2606    41065    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    220            {           2606    41056    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    219            y           2606    41045    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    218            u           2606    40982    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            s           1259    40983    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            postgres    false    216                       2606    41071    items items_orderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 D   ALTER TABLE ONLY public.items DROP CONSTRAINT "items_orderId_fkey";
       public          postgres    false    4731    220    219            �           2606    41076    items items_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public.items DROP CONSTRAINT "items_productId_fkey";
       public          postgres    false    218    220    4729            ~           2606    41066 !   products products_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public.products DROP CONSTRAINT "products_categoryId_fkey";
       public          postgres    false    218    217    4727               �  x���[j0E��Ud2��<��� `�Li씂W_�I�$�Hb$.猦�
Y%A�$�0y-3e2�(�!��Z-ˬ���a�*���(dU�Qk�`���zh������cC@�����tO�ˊ	��%�ZJqh�Q^��ԇq�q�������
1W�~M�m�q����Ri�i�NIy�LВmnr�X�m�jki�3zop�$�i&�4�4/\��O���;#���.�Y��|���|x>^.�t,_��&q�j��O����Į#���ʂI4
Kd@�}S����Jm/��@q�Z]=��5��6UK��V�Q�.۳�PD���0j6^>��������\��O�~8/���$������,ֈDŖ�8�������iיY���	�.A�QC�B�s w��=�f/N�����;t�> ��>�<@^u�v����
��         w   x�u̩�0 @,U�Ns�Nt) D�g��\}p���yPE0[
�]a�P���%��u��Y�X^T[COn���s�b�e�N�P��Y6��Yd�c�k�����'t��I1��p*�         t   x�u̱�0�ښ"|?�B�����i���K@5
�b�,FR�!N��|0�u�]}\������;a����Ol0G��G�סK�k�`�n�ڄ���FcW���l�}��&�         v   x�u��� �PE020qj�%���ҿ��g�w=��)�5
��eE#k�h⩈u&qn�������(đ���(��{w3�t���c~H�)f�J�]z/$>�����}x����/6v,b           x����n�1�g�)<�@�C�H]�f��-б%QAҤn�d��WN��h�p@�;"M��5��3A���G2�>Xv����u�m��V��ԉ������ޱ���N�j��H���SLY�G��9j������#O�ʚpCy�~a<%k�T�x���PE0ך���W1Ey����fy����J��̺�<��n����탋��$2�,h�X�;F�8J��� 3����p���%�S�Y8����ԁ;�W�0b@-]�y�u�{|����d�ں��y�r�='􅬰o���HҌz���C�q")ʛz��b�>�!C�J��0��(����.�M�b{�iOC���(ȅDreQ��3�6�T�h��6{�.��g�'C8��s�/ -ϴGȚ�u�B]�G�&�X�=�é��DDARk�����I��{KJX��O)搌,��Y�۳�1�6�,���_�,�:�1*tIL��~� K���F(ʱg�s��f�0a�&�E�a%��Z�o{���,'��V�۲Z�~|a3q           x�u�Is�H���W����/� ��",ۀ�}�*��X$@,��������2띾x���� gPk!Pi�L�K�Q�
%k:Yg�U����(��H��=Ͳ:Bl<���I��aa
���2x���s�v�������?0l`ր؇��=�[�H`�b%�!�L5q�YZ{�t^�U�'z�ˢ9/�k��|[��&��������Q��Y>Ǫe� ^�#����ɜ����q%��;� <>\��`��!}&�=ߓZ[��ؑ
�HO9�ZI�X�k{W��U����84k��.s�/C��{��_��Ե�ha���x��N�}����|��"��{�GR�:5��2@�j�Z�$�
�	�Fњn���FvL�`����\Fq�_-�:�z�~�m_b<����W�ǋ﷩B;�;A�TBD�B�{���Kt�H��Aj
�h�%t�3�h���l�o�y{�0����tH��)?Z�eK�h�T?��6�)�q�)��n�g� ���.A�*(����7�I�Z��� �D��ؔ,!AȺ��%����|c��y�=�/:�>�fx����p�7���很Z3�tS�eo5��h��b��rpP�{�g�,��0V#(�P��r�0bj�;^�y�7�(�[:��n�p�mc��)���[Y��������񮺽�dt��A�.IU��{�'Y"��)p���	"`��+d��jJk�C�Wm^�_	��chGy�x￶w����I����H˘?��[CFYw�dZ|O��	"~�����{����<�_�[_�     