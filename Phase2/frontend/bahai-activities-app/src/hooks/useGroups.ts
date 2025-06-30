import { useEffect, useState } from 'react';
import type { Member, GroupItem } from '../services/groupService';
import {
    create,
    update,
    findByTypeId,
    remove as deleteGroup
} from '../services/groupService';

interface MemberWithGroup extends Member {
    groupName: string;
}

export const useGroups = (groupTypeId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [groups, setGroups] = useState<GroupItem[]>([]);
    const [membersByGroup, setMembersByGroup] = useState<MemberWithGroup[]>([]);

    const transform = (data: GroupItem[]): MemberWithGroup[] => {
        return data.flatMap(group =>
            (group.members ?? []).map(member => ({
                ...member,
                groupName: group.name
            }))
        );
    };

    const loadGroups = async () => {
        try {
            const data = await findByTypeId(groupTypeId);
            setGroups(data);
            setMembersByGroup(transform(data));
        } catch (err) {
            console.error('Error cargando grupos:', err);
            setError('Error al cargar los datos desde el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGroups();
    }, [groupTypeId]);

    const handleSave = async (group: GroupItem) => {
        setLoading(true);
        try {
            if (group.id === 0) {
                await create({
                    name: group.name,
                    personIds: group.personIds,
                    groupTypeId
                });
            } else {
                await update(group.id, {
                    name: group.name,
                    personIds: group.personIds,
                    groupTypeId
                });
            }

            await loadGroups();
        } catch (error) {
            console.error('Error al guardar grupo:', error);
            setError('No se pudo guardar el grupo.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (groupId: number) => {
        setLoading(true);
        try {
            await deleteGroup(groupId);
            await loadGroups();
        } catch (err) {
            console.error('Error al eliminar grupo:', err);
            setError('No se pudo eliminar el grupo.');
        } finally {
            setLoading(false);
        }
    };

    return {
        error,
        loading,
        groups,
        membersByGroup,
        dialogVisible,
        setDialogVisible,
        handleSave,
        handleDelete,
        refetchGroups: loadGroups 
    };
};