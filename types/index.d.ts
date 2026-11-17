interface CategoryItem {
    id: string;
    label: string;
    icon: ImageSourcePropType;
    km: number;
}

interface CategoryItem {
    id: string;
    name: string;
    image_url: string;
}

interface CategoryListProps {
    onSelectCategory?: (id: string) => void;
}

interface PaymentItem {
    id: string;
    label: string;
    hasInfo?: boolean;
    bgClass: string;
    icon: React.ReactNode;
    amount?: number;
}

interface Payment {
    id: string;
    transaction_id: string;
    payment_method: 'qris';
    payment_status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'expired';
    qr_code: string;
    expired_at: string;
    paid_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface QrisPaymentProps {
    id_product?: string;
    id_tx?: string;
    payment_type?: string;
}

interface PaymentData {
    id: string;
    id_tx: string;
    id_product: string;
    payment_type: string;
    status: 'pending' | 'paid' | 'expired' | 'cancelled';
    paid: boolean;
    total_payment: number;
    remaining_time: number;
    order_id: string;
    seller_name: string;
    item_name: string;
    rent_fee: number;
    deposit: number;
    qr_value: string;
    created_at: string;
    updated_at: string;
}

type Product = {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    distance: string;
    verified: boolean;
};

type FilterItem = {
    id: string;
    label: string;
};

type FilterChipsProps = {
    /** Daftar filter yang ditampilkan */
    items: FilterItem[];
    /** ID filter yang sedang aktif */
    activeId?: string | null;
    /** Callback saat chip ditekan */
    onSelect?: (item: FilterItem) => void;
    /** Padding horizontal konten (default 16) */
    contentPadding?: number;
    /** Jarak antar chip (default 8) */
    gap?: number;
    /** Warna aktif (default #16783A) */
    activeColor?: string;
    /** Class tambahan untuk wrapper ScrollView */
    className?: string;
};