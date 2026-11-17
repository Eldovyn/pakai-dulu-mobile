import * as React from 'react';
import {
    View,
    ScrollView,
    Pressable,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import {
    ChevronLeft,
    MoreVertical,
    MapPin,
    CheckCircle2,
    Pencil,
    Trash2,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Portal } from '@rn-primitives/portal';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

export const PENGATURAN_ALAMAT_OVERLAY_HOST = 'pengaturan-alamat-overlay';

interface Address {
    id: number;
    label: string;
    isPrimary: boolean;
    name: string;
    phone: string;
    address: string;
    notes: string;
}

interface MenuPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

type PengaturanAlamatMobileProps = {
    /**
     * Saat true, komponen ditanam di dalam frame tablet-desktop: header
     * native disembunyikan karena header sudah dirender di dalam frame.
     */
    embedded?: boolean;
};

export default function PengaturanAlamatMobile({ embedded }: PengaturanAlamatMobileProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [addresses, setAddresses] = React.useState<Address[]>([
        {
            id: 1,
            label: 'Rumah',
            isPrimary: true,
            name: "Ahmad Syafi'i",
            phone: '0812-3456-7890',
            address:
                'Jl. Margonda Raya No. 45, RT 02 / RW 07, Kel. Kemiri Muka, Kec. Beji, Kota Depok, Jawa Barat 16424',
            notes: 'Pagar hitam di sebelah minimarket, bel rumah di tiang pagar.',
        },
        {
            id: 2,
            label: 'Kantor / Studio',
            isPrimary: false,
            name: "Ahmad Syafi'i (Creative)",
            phone: '0812-9876-5432',
            address:
                'Creative Hub Depok Lt. 2, Jl. Ir. H. Juanda No. 12, Sukmajaya, Kota Depok, Jawa Barat 16418',
            notes: 'Bisa titip di resepsionis depan atau security pos.',
        },
    ]);

    const [selectedAddressId, setSelectedAddressId] = React.useState<number | null>(1);

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [editingId, setEditingId] = React.useState<number | null>(null);

    const [formLabel, setFormLabel] = React.useState('');
    const [formName, setFormName] = React.useState('');
    const [formPhone, setFormPhone] = React.useState('');
    const [formAddress, setFormAddress] = React.useState('');
    const [formNotes, setFormNotes] = React.useState('');

    const [menuAddressId, setMenuAddressId] = React.useState<number | null>(null);
    const [menuPosition, setMenuPosition] = React.useState<MenuPosition | null>(null);

    // === KONFIRMASI HAPUS ===
    const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

    // === REF UNTUK MEASURE IKON ===
    const iconRefs = React.useRef<Record<number, View | null>>({});

    // === REF CONTAINER (FRAME) UNTUK POSISI MENU SAAT EMBEDDED ===
    const rootRef = React.useRef<View | null>(null);

    // === BUKA MENU DI POSISI IKON ===
    const handleOpenMenu = (itemId: number) => {
        const ref = iconRefs.current[itemId];
        if (ref) {
            ref.measureInWindow((x, y, width, height) => {
                const root = rootRef.current;
                if (embedded && root) {
                    // Saat embedded, menu dirender di dalam frame (bukan Modal
                    // full-screen), jadi koordinat window dikonversi ke relatif
                    // terhadap container frame.
                    root.measureInWindow((rootX, rootY) => {
                        setMenuPosition({ x: x - rootX, y: y - rootY, width, height });
                        setMenuAddressId(itemId);
                    });
                } else {
                    setMenuPosition({ x, y, width, height });
                    setMenuAddressId(itemId);
                }
            });
        } else {
            // fallback jika ref tidak tersedia
            setMenuAddressId(itemId);
            setMenuPosition(null);
        }
    };

    // === TUTUP MENU ===
    const handleCloseMenu = () => {
        setMenuAddressId(null);
        setMenuPosition(null);
    };

    // === BUKA FORM TAMBAH ===
    const handleOpenAdd = () => {
        setEditingId(null);
        setFormLabel('');
        setFormName('');
        setFormPhone('');
        setFormAddress('');
        setFormNotes('');
        setIsDialogOpen(true);
    };

    // === BUKA FORM EDIT ===
    const handleOpenEdit = (item: Address) => {
        handleCloseMenu();
        setEditingId(item.id);
        setFormLabel(item.label);
        setFormName(item.name);
        setFormPhone(item.phone);
        setFormAddress(item.address);
        setFormNotes(item.notes);
        setIsDialogOpen(true);
    };

    // === SIMPAN ===
    const handleSaveAddress = () => {
        if (!formLabel || !formName || !formPhone || !formAddress) {
            console.log('Form belum lengkap');
            return;
        }

        if (editingId !== null) {
            setAddresses((prev) =>
                prev.map((a) =>
                    a.id === editingId
                        ? {
                            ...a,
                            label: formLabel,
                            name: formName,
                            phone: formPhone,
                            address: formAddress,
                            notes: formNotes,
                        }
                        : a
                )
            );
        } else {
            const newId = Math.max(...addresses.map((a) => a.id), 0) + 1;
            setAddresses((prev) => [
                ...prev,
                {
                    id: newId,
                    label: formLabel,
                    isPrimary: false,
                    name: formName,
                    phone: formPhone,
                    address: formAddress,
                    notes: formNotes,
                },
            ]);
        }

        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingId(null);
        setFormLabel('');
        setFormName('');
        setFormPhone('');
        setFormAddress('');
        setFormNotes('');
    };

    const handleDeleteAddress = () => {
        if (deleteTargetId !== null) {
            setAddresses((prev) => prev.filter((a) => a.id !== deleteTargetId));
            if (selectedAddressId === deleteTargetId) {
                setSelectedAddressId(null);
            }
        }
        setDeleteTargetId(null);
    };

    const isEditMode = editingId !== null;
    const menuItem = addresses.find((a) => a.id === menuAddressId);

    const dialogTitle = isEditMode ? 'Edit Alamat' : 'Tambah Alamat Baru';
    const dialogDescription = isEditMode
        ? 'Perbarui data alamat di bawah ini.'
        : 'Lengkapi data alamat di bawah ini.';

    // Form tambah/edit alamat (dipakai di Dialog native & overlay in-frame)
    const addressFormFields = (
        <View className="gap-3 mt-2">
            <View>
                <Text className="text-sm font-semibold text-gray-700 mb-1">Label Alamat</Text>
                <TextInput
                    value={formLabel}
                    onChangeText={setFormLabel}
                    placeholder="Contoh: Rumah, Kantor"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-200 rounded-xl px-4 h-12 text-sm text-gray-900"
                />
            </View>

            <View>
                <Text className="text-sm font-semibold text-gray-700 mb-1">Nama Penerima</Text>
                <TextInput
                    value={formName}
                    onChangeText={setFormName}
                    placeholder="Nama lengkap"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-200 rounded-xl px-4 h-12 text-sm text-gray-900"
                />
            </View>

            <View>
                <Text className="text-sm font-semibold text-gray-700 mb-1">Nomor Telepon</Text>
                <TextInput
                    value={formPhone}
                    onChangeText={setFormPhone}
                    placeholder="08xx-xxxx-xxxx"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    className="border border-gray-200 rounded-xl px-4 h-12 text-sm text-gray-900"
                />
            </View>

            <View>
                <Text className="text-sm font-semibold text-gray-700 mb-1">Alamat Lengkap</Text>
                <TextInput
                    value={formAddress}
                    onChangeText={setFormAddress}
                    placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos"
                    placeholderTextColor="#9CA3AF"
                    multiline
                    textAlignVertical="top"
                    className="border border-gray-200 rounded-xl px-4 py-3 min-h-[80px] text-sm text-gray-900"
                />
            </View>

            <View>
                <Text className="text-sm font-semibold text-gray-700 mb-1">Catatan (Opsional)</Text>
                <TextInput
                    value={formNotes}
                    onChangeText={setFormNotes}
                    placeholder="Patokan, warna pagar, dll."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    textAlignVertical="top"
                    className="border border-gray-200 rounded-xl px-4 py-3 min-h-[60px] text-sm text-gray-900"
                />
            </View>
        </View>
    );

    // Tombol aksi form (dipakai di Dialog native & overlay in-frame)
    const dialogFooterButtons = (
        <>
            <Button
                className="flex-1 h-12 bg-gray-100 hover:bg-gray-100 active:bg-gray-200 rounded-xl"
                onPress={handleCloseDialog}
            >
                <Text className="text-sm font-bold text-gray-700">Batal</Text>
            </Button>

            <Button
                className="flex-1 h-12 bg-[#16783A] hover:bg-[#16783A] active:bg-[#16783A] rounded-xl"
                onPress={handleSaveAddress}
            >
                <Text className="text-sm font-bold text-white">Simpan</Text>
            </Button>
        </>
    );

    // Popover menu titik tiga (dipakai di Modal native & overlay in-frame)
    const menuPopover = menuPosition && (
        <View
            className="absolute bg-white rounded-xl shadow-lg py-1 border border-gray-100"
            style={{
                top: menuPosition.y + menuPosition.height + 4,
                left: menuPosition.x - 120,
                minWidth: 140,
            }}
        >
            <Pressable
                className="flex-row items-center px-4 py-3"
                onPress={() => {
                    if (menuItem) handleOpenEdit(menuItem);
                }}
            >
                <Pencil size={16} color="#16783A" />
                <Text className="ml-2 text-sm font-medium text-gray-800">Edit Alamat</Text>
            </Pressable>

            <View className="h-px bg-gray-100 mx-2" />

            <Pressable
                className="flex-row items-center px-4 py-3"
                onPress={() => {
                    setDeleteTargetId(menuAddressId);
                    handleCloseMenu();
                }}
            >
                <Trash2 size={16} color="#DC2626" />
                <Text className="ml-2 text-sm font-medium text-red-600">Hapus Alamat</Text>
            </Pressable>
        </View>
    );

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFF8EE"
                translucent={false}
            />

            <Stack.Screen
                options={{
                    headerShown: !embedded,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: 'Pengaturan Alamat',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#111827',
                    },
                    headerStyle: { backgroundColor: '#FFF8EE' },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            className="p-1 -ml-1"
                            hitSlop={10}
                        >
                            <ChevronLeft size={24} color="#16783A" strokeWidth={2.5} />
                        </Pressable>
                    ),
                }}
            />

            <View ref={rootRef} className="flex-1 bg-[#FFF8EE]">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                >
                    {addresses.map((item) => {
                        const isSelected = selectedAddressId === item.id;

                        return (
                            <Pressable
                                key={item.id}
                                onPress={() => setSelectedAddressId(item.id)}
                                className={`bg-white rounded-2xl p-5 mb-4 border ${isSelected
                                    ? 'border-[#16783A]'
                                    : 'border-transparent'
                                    }`}
                            >
                                <View className="flex-row items-center justify-between mb-3">
                                    <View className="flex-row items-center">
                                        <Text className="text-base font-bold text-gray-900 mr-2">
                                            {item.label}
                                        </Text>
                                        {item.isPrimary && (
                                            <View className="bg-[#E8F5E9] px-2 py-0.5 rounded-md">
                                                <Text className="text-[10px] font-bold text-[#16783A]">
                                                    Utama
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    <View className="flex-row items-center">
                                        {isSelected && (
                                            <CheckCircle2
                                                size={18}
                                                color="#16783A"
                                                className="mr-2"
                                            />
                                        )}

                                        {/* IKON TITIK TIGA (dengan ref untuk measure) */}
                                        <Pressable
                                            ref={(r) => {
                                                iconRefs.current[item.id] =
                                                    r as unknown as View | null;
                                            }}
                                            hitSlop={10}
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                handleOpenMenu(item.id);
                                            }}
                                        >
                                            <MoreVertical size={20} color="#6B7280" />
                                        </Pressable>
                                    </View>
                                </View>

                                <Text className="text-sm font-bold text-gray-800 mb-1">
                                    {item.name} • {item.phone}
                                </Text>

                                <Text className="text-sm text-gray-600 leading-5 mb-3">
                                    {item.address}
                                </Text>

                                <View className="bg-[#F3F4F6] rounded-xl p-3">
                                    <Text className="text-xs text-gray-500 leading-4">
                                        {item.notes}
                                    </Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                <View
                    className="bg-white px-4 pt-4 border-t border-gray-200"
                    style={{ paddingBottom: Math.max(insets.bottom, 16) }}
                >
                    <Button
                        className="w-full h-14 bg-[#16783A] hover:bg-[#16783A] active:bg-[#16783A] rounded-xl flex-row items-center justify-center"
                        onPress={handleOpenAdd}
                    >
                        <MapPin size={20} color="white" className="mr-2" />
                        <Text className="text-base font-bold text-white">
                            Tambah Alamat Baru
                        </Text>
                    </Button>
                </View>
            </View>

            {/* === MENU TITIK TIGA (POSISI DI SAMPING IKON) === */}
            {menuAddressId !== null && menuPosition && (
                embedded ? (
                    // Di dalam frame: render overlay in-frame, bukan Modal full-screen
                    <View className="absolute inset-0 z-50">
                        <Pressable className="flex-1" onPress={handleCloseMenu}>
                            {menuPopover}
                        </Pressable>
                    </View>
                ) : (
                    <Modal transparent visible animationType="fade" onRequestClose={handleCloseMenu}>
                        <Pressable className="flex-1" onPress={handleCloseMenu}>
                            {menuPopover}
                        </Pressable>
                    </Modal>
                )
            )}

            {/* === DIALOG TAMBAH / EDIT === */}
            <Dialog open={isDialogOpen && !embedded} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-[95vw] rounded-2xl">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-gray-900">
                                {dialogTitle}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">
                                {dialogDescription}
                            </DialogDescription>
                        </DialogHeader>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            className="max-h-[400px]"
                        >
                            {addressFormFields}
                        </ScrollView>

                        <DialogFooter className="flex-row gap-2 mt-4">
                            {dialogFooterButtons}
                        </DialogFooter>
                    </KeyboardAvoidingView>
                </DialogContent>
            </Dialog>

            {/* === KONFIRMASI HAPUS === */}
            <AlertDialog
                open={deleteTargetId !== null && !embedded}
                onOpenChange={(open) => {
                    if (!open) setDeleteTargetId(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Alamat?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Alamat ini akan dihapus permanen. Tindakan ini tidak
                            dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onPress={() => setDeleteTargetId(null)}>
                            <Text>Batal</Text>
                        </AlertDialogCancel>
                        <AlertDialogAction onPress={handleDeleteAddress}>
                            <Text className="text-white">Hapus</Text>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* === OVERLAY IN-FRAME (EMBEDDED) ===
                Di-render lewat Portal ke level frame (lihat tablet-desktop) supaya
                overlay ikut menutupi header kustom, bukan hanya area konten. */}
            {embedded && (
                <Portal
                    name="pengaturan-alamat-overlay"
                    hostName={PENGATURAN_ALAMAT_OVERLAY_HOST}
                >
                    {isDialogOpen && (
                        <View className="absolute inset-0 z-50 items-center justify-center bg-black/50 p-2">
                            <View className="w-full rounded-2xl bg-white p-6" style={{ maxWidth: 360 }}>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                >
                                    <View className="flex flex-col gap-2">
                                        <Text className="text-lg font-bold text-gray-900">
                                            {dialogTitle}
                                        </Text>
                                        <Text className="text-sm text-gray-500">
                                            {dialogDescription}
                                        </Text>
                                    </View>

                                    <ScrollView showsVerticalScrollIndicator={false} className="max-h-[400px]">
                                        {addressFormFields}
                                    </ScrollView>

                                    <View className="flex-row gap-2 mt-4">
                                        {dialogFooterButtons}
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        </View>
                    )}

                    {deleteTargetId !== null && (
                        <View className="absolute inset-0 z-50 items-center justify-center bg-black/50 p-2">
                            <View className="w-full rounded-2xl bg-white p-6" style={{ maxWidth: 360 }}>
                                <View className="flex flex-col gap-2">
                                    <Text className="text-lg font-semibold text-gray-900">
                                        Hapus Alamat?
                                    </Text>
                                    <Text className="text-sm text-gray-500">
                                        Alamat ini akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                    </Text>
                                </View>
                                <View className="flex flex-row-reverse gap-2 mt-4">
                                    <Button
                                        className="bg-[#16783A] hover:bg-[#16783A] active:bg-[#16783A]"
                                        onPress={handleDeleteAddress}
                                    >
                                        <Text className="text-white">Hapus</Text>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onPress={() => setDeleteTargetId(null)}
                                    >
                                        <Text>Batal</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    )}
                </Portal>
            )}
        </>
    );
}